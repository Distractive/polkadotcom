/** @type {import('next-sitemap').IConfig} */
import { createClient } from "next-sanity"

const baseUrl = "https://polkadot.com"
const docTypes = ["post", "page", "landing"]

// Create Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  useCdn: false,
})

async function fetchDataFromSanity() {
  const query = `
    *[_type in [${docTypes.map((type) => `"${type}"`).join(", ")}]] {
      _type,
      slug,
      _updatedAt
    }
  `
  try {
    const data = await sanityClient.fetch(query)
    console.log(`Total documents fetched: ${data.length}`)
    // Log all documents
    // console.log("Fetched documents:")
    // data.forEach((doc, index) => {
    //   console.log(`Document ${index + 1}:`, {
    //     _type: doc._type,
    //     slug: doc.slug?.current,
    //     _updatedAt: doc._updatedAt,
    //   })
    // })
    return data
  } catch (error) {
    console.error("Sanity query error:", error)
    return []
  }
}

export default {
  siteUrl: baseUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalPaths: async (config) => {
    const result = []

    // Add home page
    result.push({ loc: "/", lastmod: new Date().toISOString() })

    const sanityData = await fetchDataFromSanity()

    // Add Sanity pages to result
    sanityData.forEach((doc) => {
      if (!doc.slug || !doc.slug.current) return

      let path
      switch (doc._type) {
        case "post":
          path = `/blog/${doc.slug.current}`
          break
        case "page":
          path = `/${doc.slug.current}`
          break
        case "landing":
          path = `/${doc.slug.current}`
          break
        default:
          return // Skip unknown types
      }

      result.push({
        loc: path,
        lastmod: new Date(doc._updatedAt).toISOString(),
      })
    })

    return result
  },
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
