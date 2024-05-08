/**
 * STEP 1: Export tags from Ghost
 * Format of imported tags
 * {"_type: "tag", "name": "tag-name", "slug": "tag-slug", "g_id": "ghost-id"}
 * Export data from sql to json using Dbeaver or equivalent
 * select id, name, slug from tags t where visibility = 'public'
 *
 * Import data from json to ndjson
 * sanity dataset import blog-importer/tags.ndjson production --replace
 *
 * STEP 2: Export tags from Sanity
 *
 */

// select
// 	p.title,
// 	p.slug,
// 	p.feature_image,
// 	p.custom_excerpt,
// 	p.published_at,
// 	p.html,
// 	pm.meta_title,
// 	pm.meta_description,
// 	(select sanity_id from users u where u.id = pa.author_id) as author_id,
// 	GROUP_CONCAT(t.sanity_id SEPARATOR ',') AS tags
// from posts p
// join posts_meta pm on p.id = pm.post_id
// join posts_authors pa on p.id = pa.post_id
// JOIN
//     posts_tags pt ON p.id = pt.post_id
// join
//     tags t ON t.id = pt.tag_id
// where p.`type` = 'post' and p.custom_template is null
// group by p.title,p.slug,pa.author_id
// order by p.published_at desc
// limit 5

// STEP 1: Export tags from Ghost
const fs = require("fs-extra")
const posts = require("../data/posts.json")
const { JSDOM } = require("jsdom")
const { htmlToBlocks, getBlockContentFeatures } = require("@sanity/block-tools")
const { Schema } = require("@sanity/schema")

const defaultSchema = Schema.compile({
  name: "Posts",
  types: [
    {
      name: "meta",
      title: "Meta",
      type: "object",
      description: "Meta data",
      fields: [
        {
          name: "meta_title",
          title: "Meta Title",
          type: "string",
        },
        {
          name: "meta_description",
          title: "Meta Description",
          type: "text",
          rows: 5,
        },
      ],
    },
    {
      name: "youtube",
      type: "object",
      title: "YouTube Embed",
      fields: [
        {
          name: "url",
          type: "url",
          title: "YouTube iframe embed src",
        },
        {
          name: "title",
          type: "string",
          title: "Title",
        },
      ],
    },

    {
      name: "code",
      type: "object",
      title: "Code",
      fields: [
        {
          name: "language",
          title: "Language",
          type: "string",
        },
        {
          name: "filename",
          title: "Filename",
          type: "string",
        },
        {
          title: "Code",
          name: "code",
          type: "text",
        },
      ],
    },
    {
      name: "post",
      title: "Post",
      type: "document",
      groups: [
        { title: "Config", name: "config" },
        { title: "Content", name: "content" },
      ],
      fields: [
        {
          name: "meta",
          type: "meta",
          group: "meta",
        },
        {
          name: "post_type",
          title: "Post Type",
          type: "string",
          options: {
            list: ["Blog", "Press Release"],
          },
          group: "config",
        },
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
          group: "config",
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "name",
          },
          validation: (rule) => rule.required(),
          group: "config",
        },
        {
          name: "author",
          title: "Author",
          type: "reference",
          to: [{ type: "author" }],
          group: "config",
        },
        {
          name: "tags",
          title: "Tags",
          type: "array",
          of: [{ type: "reference", to: [{ type: "tag" }] }],
          group: "config",
        },
        {
          name: "published_date",
          title: "Published Date",
          description:
            "The date this post was published, does not rely on system fields",
          type: "datetime",
          group: "config",
        },
        {
          name: "featured_image",
          title: "Featured Image",
          description: "Only for blog posts",
          type: "image",
          group: "content",
        },
        {
          name: "custom_excerpt",
          title: "Excerpt",
          description: "A custom excerpt for the post, to show on list page",
          type: "text",
          rows: 5,
          group: "content",
        },
        {
          name: "body",
          title: "Body",
          type: "array",
          of: [
            {
              type: "block",
            },
            {
              type: "image",
              fields: [
                {
                  type: "string",
                  name: "alt",
                  title: "Alt",
                  description: "The alt text of the image",
                },
                {
                  type: "text",
                  name: "caption",
                  title: "Caption",
                  description: "If the image needs a caption like a credit etc",
                },
              ],
            },
            {
              type: "youtube",
            },
            {
              type: "code",
            },
          ],
          group: "content",
        },
      ],
    },
  ],
})

const blockContentType = defaultSchema
  .get("post")
  .fields.find((field) => field.name === "body").type

const ndjsonArray = posts.map((post) => {
  const main = {
    _type: "post",
    title: post.title,
    slug: { current: post.slug },
    author: { _ref: post.author_id },
    published_date: post.published_at,
    custom_excerpt: post.custom_excerpt,
    tags: post.tags ? post.tags.split(",").map((tag) => ({ _ref: tag })) : [],
    meta: {
      meta_title: post.meta_title,
      meta_description: post.meta_description,
    },
    post_type: "Press Release",
    body: htmlToBlocks(post.html, blockContentType, {
      parseHtml: (html) => {
        return new JSDOM(html).window.document
      },
      rules: [
        {
          deserialize(el, next, block) {
            // images are wrapped in a figure tag, some have figcaption some don't
            if (el.tagName?.toLowerCase() === "figure") {
              let src = ""
              let imgAlt = ""
              let figCaption = ""
              let hasImage = false
              let hasIframe = false
              let iframeSrc = ""
              el.childNodes.forEach((child) => {
                console.log(child.tagName)
                if (child.tagName.toLowerCase() === "img") {
                  imgSrc = child.src
                  imgAlt = child.alt
                  hasImage = true
                }
                if (child.tagName.toLowerCase() === "figcaption") {
                  figCaption = child.textContent
                }
                if (child.tagName.toLowerCase() === "iframe") {
                  iframeSrc = child.src
                  figCaption = child.title
                  hasIframe = true
                }
              })
              if (hasImage) {
                return block({
                  _type: "image",
                  _sanityAsset: imgSrc.includes("__GHOST_URL__/")
                    ? `image@file:///Users/adrianfriend/Desktop/polkadot/${imgSrc.replace("__GHOST_URL__/content/", "")}`
                    : `image@${imgSrc}`,
                  caption: figCaption,
                  alt: imgAlt,
                })
              }
              if (hasIframe) {
                return block({
                  _type: "youtube",
                  url: iframeSrc,
                  title: figCaption,
                })
              }
            }

            if (el.tagName?.toLowerCase() === "pre") {
              return block({
                _type: "code",
                language: "text",
                code: el.textContent,
              })
            }

            return undefined
          },
        },
      ],
    }),
  }

  // console.log(main.body)

  if (post.feature_image) {
    return {
      ...main,
      featured_image: {
        _type: "image",
        _sanityAsset: `image@file:///Users/adrianfriend/Desktop/polkadot/${post.feature_image.replace("__GHOST_URL__/content/", "")}`,
      },
      post_type: "Blog",
    }
  }
  return main
})

const ndjsonString = ndjsonArray.map((tag) => JSON.stringify(tag)).join("\n")

fs.writeFile("../data/posts.ndjson", ndjsonString, "utf8")
  .then(() => console.log("file has been written successfully."))
  .catch((err) => console.error("Error writing file:", err))
