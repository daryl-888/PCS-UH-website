/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Output File Tracing — bundles only the deps each route actually needs
  // into .next/standalone instead of shipping full node_modules. Required
  // to stay under Azure Static Web Apps' 250MB hybrid-app limit and keeps
  // the managed backend function's cold start small. No-op on Vercel.
  output: "standalone",
  async headers() {
    return [
      {
        // Static 3D asset never changes without a filename change — let
        // browsers/CDN cache it for a year instead of revalidating on
        // every load, cutting repeat-visit requests to the origin.
        source: "/models/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
