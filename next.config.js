/** @type {import('next').NextConfig} */
const nextConfig = {
  // 核心：让编译器跳过 ESLint 检查
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 核心：让编译器跳过 TypeScript 类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;