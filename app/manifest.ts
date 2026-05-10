import type { MetadataRoute } from "next";
import meta from "@/lib/meta";

/** PWA Web Manifest（Next 默认路由为 /manifest.webmanifest，经 rewrite 同时提供 /site.webmanifest） */
export default function manifest(): MetadataRoute.Manifest {
	const { title, description } = meta.site.metadata;
	const { englishName } = meta.resume.profile;

	return {
		name: title,
		short_name: englishName,
		description,
		start_url: "/",
		display: "standalone",
		orientation: "portrait-primary",
		background_color: "#f8f7f4",
		theme_color: "#17100c",
		lang: "zh-CN",
		dir: "ltr",
		icons: [
			{
				src: "/logo.svg",
				type: "image/svg+xml",
				sizes: "512x512",
				purpose: "any",
			},
			{
				src: "/favicon.svg",
				type: "image/svg+xml",
				sizes: "any",
				purpose: "maskable",
			},
		],
	};
}
