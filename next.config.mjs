/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/*",
      },
    ],
  },
  //allow insecure requests to http
  httpAgentOptions: {
    rejectUnauthorized: false,
  },
};

export default nextConfig;
