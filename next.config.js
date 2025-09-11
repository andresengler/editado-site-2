/** @type {import('next').NextConfig} */
const nextConfig = {
  // (opcional) puedes dejar esto como está si no lo usas
  experimental: {
    optimizeCss: true,
  },
  webpack: (config) => {
    // Alias para que cualquier import 'motion/react' use 'framer-motion'
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'motion/react': 'framer-motion',
    };
    return config;
  },
};

module.exports = nextConfig;
