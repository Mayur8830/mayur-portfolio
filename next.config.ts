import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The parent folder holds an unrelated lockfile; pin the workspace root here.
  turbopack: { root: __dirname },
};

export default nextConfig;
