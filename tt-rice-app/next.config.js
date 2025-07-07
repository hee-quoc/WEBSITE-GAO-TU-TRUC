/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'omweb-prod.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '/**', // This allows any path from this hostname.
      },
    ],
  },
};

export default config;
