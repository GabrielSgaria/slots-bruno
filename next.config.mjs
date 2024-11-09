/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracing: false,
  reactStrictMode: true,
  swcMinify: true, // Habilita a minificação SWC para melhor performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development', // Remove console.logs em produção
  },
  serverRuntimeConfig: {
    serverTimeout: 60000, // 60 segundos de timeout para o servidor
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|js|css)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.facebook.com', pathname: '/**' },
      { protocol: 'https', hostname: 'sa-east-1.graphassets.com', pathname: '/**' },
      { protocol: 'https', hostname: 'grupofpsinais.com.br', pathname: '/**' },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;