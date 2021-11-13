/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : null
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/exchange',
        permanent: true,
      },
    ]
  },
}
