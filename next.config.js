/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.vox-cdn.com",
      "images.unsplash.com",
      "techcrunch.com",
      "img-cdn.tnwcdn.com",
      "media.zenfs.com",
      "media.wired.com",
      "s.yimg.com",
      "img-cdn.tnwcdn.com",
    ],
  },
};

module.exports = nextConfig;
