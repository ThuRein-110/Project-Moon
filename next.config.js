/** @type {import('next').NextConfig }*/


const withPWA = require('next-pwa')

module.exports = withPWA({
  dest: 'public',
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
})

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
