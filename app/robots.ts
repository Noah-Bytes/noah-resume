import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** robots.txt：允许收录首页，屏蔽 API */
export default function robots(): MetadataRoute.Robots {
	const base = getSiteUrl();

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/"],
		},
		sitemap: `${base}/sitemap.xml`,
		host: base.replace(/^https?:\/\//, ""),
	};
}
