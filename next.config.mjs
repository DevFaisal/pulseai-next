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
  async headers() {
    return [
      {
        source: "/_svc/pulseaicore/auth/login",
        headers: [
          {
            key: "Content-Type",
            value: "application/x-www-form-urlencoded",
          },
          {
            key: "Accept",
            value: "application/json",
          },
        ],
      },
      {
        source: "/_svc/pulseaicore/vision/vitals",
        headers: [
          {
            key: "Content-Type",
            value: "application/x-www-form-urlencoded",
          },
          {
            key: "Accept",
            value: "application/json",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
