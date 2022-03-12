/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    reactStrictMode: true,
    /* Necessary for Docker support */
    experimental: {
        outputStandalone: true
    }
};

module.exports = nextConfig;
