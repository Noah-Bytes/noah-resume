import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** 单页站点 sitemap */
export default function sitemap(): MetadataRoute.Sitemap {
	const base = getSiteUrl();

	return [
		{
			url: base,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
	];
}
