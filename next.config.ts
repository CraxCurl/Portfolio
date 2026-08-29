import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/adventures",
        permanent: true,
      },
      {
        source: "/skills",
        destination: "/arsenal",
        permanent: true,
      },
      {
        source: "/experience",
        destination: "/journey",
        permanent: true,
      },
      {
        source: "/achievements",
        destination: "/playworld",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
