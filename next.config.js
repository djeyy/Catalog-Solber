/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'navi86021.fvds.ru',
        port: '',
        pathname: '/dash/**'
      }
    ]
  }
}
