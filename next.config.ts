import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  /**
   * React Three Fiber manages its own root inside the canvas. Strict
   * Mode's double-invoked effects tear that root down mid-render, which
   * React 19 reports as "attempted to synchronously unmount a root".
   * The scene is already covered by the Playwright suite.
   */
  reactStrictMode: false,
  /**
   * The development indicator sits in the bottom-left corner, where the
   * world's region strip lives on small screens. It is turned off so the
   * scene is unobstructed and the browser tests are not flaky.
   */
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
