/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh5.googleusercontent.com', 'picsum.photos']
  },  
}

module.exports = nextConfig
