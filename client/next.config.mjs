/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "https://swipetrip.onrender.com/api",
    NEXT_PUBLIC_API_URL_LOCAL: "http://localhost:8080/api",
  },
};

export default nextConfig;
