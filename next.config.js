/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  images: {
    domains: ['randomuser.me'],
  },
};

module.exports = nextConfig;
