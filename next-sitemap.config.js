/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_URL || 'https://example.com',
    exclude: ["/manager", "/manager/*", "/api-docs", "/login", "/auth/signin"],
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: "*",
                disallow: "/_next",
            },
            {
                userAgent: "*",
                disallow: "/manager",
            },
            {
                userAgent: "*",
                disallow: "/api-docs",
            },
            {
                userAgent: "*",
                disallow: "/login",
            },
            {
                userAgent: "*",
                disallow: "/cdn-cgi",
            },
            {
                userAgent: "*",
                disallow: "/auth",
            },
            {
                userAgent: "*",
                disallow: "/auth/signin",
            }
        ],
    },
}