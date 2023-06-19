module.exports = {
  webpack(config) {
    return config;
  },
  experimental: { esmExternals: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.IMAGES_HOSTNAME,
        port: '',
      },
    ],
  },
};
