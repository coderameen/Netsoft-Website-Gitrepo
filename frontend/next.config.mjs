/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/branding/**"
      }
    ]
  }
};

export default nextConfig;
