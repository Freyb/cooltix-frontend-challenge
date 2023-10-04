/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['randomuser.me'],
  },
};

module.exports = nextConfig;
