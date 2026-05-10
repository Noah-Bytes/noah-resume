/** 站点绝对地址：优先 NEXT_PUBLIC_SITE_URL，其次 Vercel，本地默认 localhost */

export function getSiteUrl(): string {
	const trimmed = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
	if (trimmed) return trimmed;

	const vercel = process.env.VERCEL_URL?.trim().replace(/^https?:\/\//, "");
	if (vercel) return `https://${vercel}`;

	return "http://localhost:3000";
}
