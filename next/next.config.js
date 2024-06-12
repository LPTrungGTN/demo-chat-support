/** @type {import('next').NextConfig} */

const dotenv = require("dotenv");
dotenv.config();

const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
