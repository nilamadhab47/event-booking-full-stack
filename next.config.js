/** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images:{
//     domains:["18-candleriggs.fra1.digitaloceanspaces.com"]
//   },
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
// }

const withTM = require('next-transpile-modules')([
  'react-syntax-highlighter',
  'swagger-client',
  'swagger-ui-react',
]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["18-candleriggs.fra1.digitaloceanspaces.com","dummyimage.com"]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: { optimizeCss: true },
})
