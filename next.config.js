/** @type {import('next').NextConfig }*/


const withPWA = require('next-pwa')({
  dest: 'public',
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
})

module.exports = withPWA({
  
})

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
