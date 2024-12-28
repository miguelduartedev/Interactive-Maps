const withPWA = require("next-pwa")({
  dest: "public",
})

module.exports = withPWA({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ]
  },
})
