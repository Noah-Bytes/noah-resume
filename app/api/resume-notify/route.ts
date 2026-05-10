import { NextResponse } from "next/server";

/** 企业微信机器人 text 文案前缀 */
const LABELS: Record<string, string> = {
	pdf_download: "📄 PDF 下载",
	copy_email: "📋 复制邮箱",
	copy_phone: "📋 复制电话",
	mailto_click: "✉️ 点击发送邮件",
};

/** 单条 text 内容 UTF-8 字节上限（官方约 2048，预留余量） */
const MAX_CONTENT_BYTES = 1900;

function truncateUtf8Bytes(s: string, maxBytes: number): string {
	const buf = new TextEncoder().encode(s);
	if (buf.length <= maxBytes) return s;
	const sliced = buf.slice(0, Math.max(0, maxBytes - 3));
	return `${new TextDecoder().decode(sliced)}…`;
}

function pickStr(v: unknown, maxChars: number): string | undefined {
	if (typeof v !== "string") return undefined;
	const t = v.trim();
	if (!t) return undefined;
	return t.length > maxChars ? `${t.slice(0, maxChars)}…` : t;
}

function clientIp(req: Request): string | undefined {
	const xff = req.headers.get("x-forwarded-for");
	if (xff) {
		const first = xff.split(",")[0]?.trim();
		if (first) return first;
	}
	const realIp = req.headers.get("x-real-ip")?.trim();
	if (realIp) return realIp;
	const cf = req.headers.get("cf-connecting-ip")?.trim();
	if (cf) return cf;
	return undefined;
}

export async function POST(req: Request) {
	const webhookUrl = process.env.WECHAT_WORK_WEBHOOK_URL;
	if (!webhookUrl) {
		return NextResponse.json({ ok: true, skipped: true });
	}

	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: "invalid json" }, { status: 400 });
	}

	if (typeof body !== "object" || body === null) {
		return NextResponse.json({ error: "invalid body" }, { status: 400 });
	}

	const o = body as Record<string, unknown>;
	const rawType = typeof o.type === "string" ? o.type : "";

	if (!(rawType in LABELS)) {
		return NextResponse.json({ error: "invalid type" }, { status: 400 });
	}

	const label = LABELS[rawType];
	const serverTime = new Date().toISOString();
	const ip = clientIp(req);

	const clientTime = pickStr(o.clientTime, 40);
	const pageUrl = pickStr(o.pageUrl, 800);
	const referrer = pickStr(o.referrer, 800);
	const userAgent = pickStr(o.userAgent, 600);
	const language = pickStr(o.language, 40);
	const timezone = pickStr(o.timezone, 80);
	const viewport = pickStr(o.viewport, 24);
	const screen = pickStr(o.screen, 24);
	const platform = pickStr(o.platform, 80);
	const copiedText = pickStr(o.copiedText, 120);
	const linkHref = pickStr(o.linkHref, 400);
	const downloadFilename = pickStr(o.downloadFilename, 200);
	const pdfHref = pickStr(o.pdfHref, 800);

	const lines: string[] = [`${label}`, `服务端时间：${serverTime}`];

	if (clientTime) lines.push(`客户端时间：${clientTime}`);
	if (ip) lines.push(`访客 IP：${ip}`);
	if (pageUrl) lines.push(`页面：${pageUrl}`);
	lines.push(`来源：${referrer ?? "（空 / 直连）"}`);
	if (language) lines.push(`语言：${language}`);
	if (timezone) lines.push(`时区：${timezone}`);
	if (viewport) lines.push(`视口：${viewport}`);
	if (screen) lines.push(`屏幕：${screen}`);
	if (platform) lines.push(`平台：${platform}`);
	if (userAgent) lines.push(`UA：${userAgent}`);

	if (rawType === "copy_email" || rawType === "copy_phone") {
		if (copiedText) lines.push(`复制内容：${copiedText}`);
	}
	if (rawType === "mailto_click" && linkHref) {
		lines.push(`邮件链接：${linkHref}`);
	}
	if (rawType === "pdf_download") {
		if (downloadFilename) lines.push(`文件名：${downloadFilename}`);
		if (pdfHref) lines.push(`PDF 链接：${pdfHref}`);
	}

	let content = lines.join("\n");
	content = truncateUtf8Bytes(content, MAX_CONTENT_BYTES);

	try {
		const res = await fetch(webhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				msgtype: "text",
				text: { content },
			}),
		});

		const data = (await res.json().catch(() => ({}))) as {
			errcode?: number;
			errmsg?: string;
		};

		if (!res.ok || data.errcode !== 0) {
			return NextResponse.json(
				{ ok: false, errcode: data.errcode, errmsg: data.errmsg },
				{ status: 502 },
			);
		}

		return NextResponse.json({ ok: true });
	} catch {
		return NextResponse.json({ ok: false }, { status: 502 });
	}
}
