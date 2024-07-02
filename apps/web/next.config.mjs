/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  experimental: {
    taint: true,
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/blog/page/1",
        permanent: true,
      },
      {
        source: "/newsroom/press-releases",
        destination: "/newsroom/press-releases/page/1",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
