import type { NextConfig } from 'next';

// Canonical domain is read from environment so the site stays correct across
// environments. It falls back to a sensible default so local development and
// test builds do not fail.
const domain = process.env.CANONICAL_DOMAIN ?? 'https://utilities.example.com';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep the app fast and small. No server-only runtime features are required;
  // the entire core is static + deterministic client/server computation.
  poweredByHeader: false,
  // The homepage and every tool/category page are statically generatable.
  // Dynamic dynamic=[category]/[tool] routes are resolved from a static
  // registry, so they can also be generated at build time.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Defensive, conservative security headers. Kept intentionally mild
          // so they never break Next.js, fonts, or analytics.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
