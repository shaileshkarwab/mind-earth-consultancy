import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // All calls to /api/proxy/** are forwarded to the real API server.
        // Because the rewrite runs server-side, the browser never sees a
        // cross-origin request and CORS is not triggered.
        source: "/api/proxy/:path*",
        destination: "https://admin-api.mindearthconsultancy.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
