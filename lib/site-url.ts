/** 站点绝对地址：优先 NEXT_PUBLIC_SITE_URL，其次 Vercel，本地默认 localhost */

const WWW_PRODUCTION = "https://www.noahyc.me";

/** 生产环境首选 www；apex 配置仍归一化为 www，与 Vercel 307 一致 */
function normalizeSiteUrl(url: string): string {
	const trimmed = url.trim().replace(/\/$/, "");
	if (trimmed === "https://noahyc.me" || trimmed === "http://noahyc.me") {
		return WWW_PRODUCTION;
	}
	return trimmed;
}

export function getSiteUrl(): string {
	const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
	if (fromEnv) return normalizeSiteUrl(fromEnv);

	const vercel = process.env.VERCEL_URL?.trim().replace(/^https?:\/\//, "");
	if (vercel) return normalizeSiteUrl(`https://${vercel}`);

	return "http://localhost:3000";
}
