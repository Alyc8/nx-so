/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/cartelera",
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
