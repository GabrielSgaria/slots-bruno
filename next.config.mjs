import withPWA from 'next-pwa';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    headers: async () => [
        {
            source: '/_next/static/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                },
            ],
        },
        {
            source: '/:all*(svg|jpg|jpeg|png|gif|ico|js|css)',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                },
            ],
        },
        {
            source: '/sw.js',
            headers: [
                {
                    key: 'Content-Type',
                    value: 'application/javascript; charset=utf-8',
                },
                {
                    key: 'Cache-Control',
                    value: 'no-cache, no-store, must-revalidate',
                },
                {
                    key: 'Content-Security-Policy',
                    value: "default-src 'self'; script-src 'self'",
                },
            ],
        },
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.facebook.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'sa-east-1.graphassets.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'api.cloudflare.com',
                pathname: '/**'
            }
        ],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60 * 60 * 24, // 1 dia
    },
    // Configuração do cache handler
    cacheHandler: path.join(__dirname, 'cache-handler.js'),
    cacheMaxMemorySize: 0, // desativa o cache em memória padrão
};

const withPWAConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
});

export default withPWAConfig(nextConfig);