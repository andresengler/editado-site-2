/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // evita cuelgues durante la optimización
  },
  // opcional: si no usas ESLint en CI
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
