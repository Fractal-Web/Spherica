import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [new URL("https://pbs.twimg.com/**")],
	},
};

export default nextConfig;
