/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:8080/api",
  },
};

export default nextConfig;
