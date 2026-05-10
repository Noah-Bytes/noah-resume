/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
	// Next App Router 生成的 manifest 位于 /manifest.webmanifest，另映射常用文件名
	async rewrites() {
		return [
			{ source: "/site.webmanifest", destination: "/manifest.webmanifest" },
		];
	},
};

export default nextConfig;
