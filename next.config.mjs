/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
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
            }]
    },
    images: {
        remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'www.grupofpsinais.com.br',
        //         pathname: '/**',
        //     },

            {
                protocol: 'https',
                hostname: 'sa-east-1.graphassets.com',
                pathname: '/**',
            },
        ],
        formats: ['image/webp'],
        minimumCacheTTL: 60 * 60 * 24, // 1 dia
    },
};

export default nextConfig;
