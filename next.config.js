/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "kayvon.com" }], destination: "https://qavyon.com/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "qavion.com" }], destination: "https://qavyon.com/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "quavyon.com" }], destination: "https://qavyon.com/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "www.qavyon.com" }], destination: "https://qavyon.com/:path*", permanent: true },
      { source: "/solutions", destination: "/what-we-solve", permanent: true },
      { source: "/solutions/:slug", destination: "/what-we-solve/:slug", permanent: true },
      { source: "/contact", destination: "/book", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
    ];
  },
};

module.exports = nextConfig;
