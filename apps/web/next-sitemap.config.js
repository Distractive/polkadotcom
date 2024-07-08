/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.polkdot.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalPaths: async (config) => {
    const result = []

    result.push({ loc: "/", lastmod: new Date().toISOString() })

    return result
  },
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
