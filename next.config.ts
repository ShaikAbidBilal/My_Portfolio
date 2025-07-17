import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isGithubPages ? '/My_Portfolio' : '',
  assetPrefix: isGithubPages ? '/My_Portfolio/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
