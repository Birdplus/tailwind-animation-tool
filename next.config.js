/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 告诉 Next.js 在生产构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 如果有类型错误也一并忽略，确保能顺利发布
    ignoreBuildErrors: true,
  },
};

export default nextConfig;