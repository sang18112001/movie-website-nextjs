/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'image.tmdb.org'
         },
         {
            protocol: 'https',
            hostname: 'wallpaper.dog'
         },
         {
            protocol: 'https',
            hostname: 'upload.wikimedia.org'
         },
         {
            protocol: 'https',
            hostname: 'archive.org'
         },
         {
            protocol: 'https',
            hostname: 'cdn.pixabay.com'
         },
         
      ],
   }
}

module.exports = nextConfig
