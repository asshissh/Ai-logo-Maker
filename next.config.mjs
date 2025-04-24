/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
        },
        // If you need more specific patterns or additional hosts, add them here
      ],
      // Optional: You can also add these if needed
      // domains: ['firebasestorage.googleapis.com'],
      // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
  };
  
  export default nextConfig;