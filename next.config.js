/** @type {import('next').NextConfig} */
onst withPWA = require('next-pwa')({
  dest: 'public',
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
})

module.exports = withPWA({
  // next.js config
})

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
