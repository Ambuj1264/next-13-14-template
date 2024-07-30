/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["socialmotion-app.s3.eu-north-1.amazonaws.com"],
  },
  env: {
    SITE_KEY: process.env.SITE_KEY,
    SECRETKEY: process.env.SECRETKEY,
    API_BASE_URL: process.env.API_BASE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    GRAPHQL_BASE_URL: process.env.GRAPHQL_BASE_URL,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    LINKEDIN_URL: process.env.LINKEDIN_URL,
    EXTENSION_ID: process.env.EXTENSION_ID,
    EXTENSION_URL: process.env.EXTENSION_URL,
  },
};
module.exports = nextConfig;
