import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is opened at 127.0.0.1 while it binds on all interfaces.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
