/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com"],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};
