/** 简历站点行为上报（由客户端调用 /api/resume-notify，服务端转发企业微信机器人） */

export type ResumeNotifyEvent =
	| "pdf_download"
	| "copy_email"
	| "copy_phone"
	| "copy_telegram"
	| "mailto_click";

/** 随事件附加的简要上下文（不含敏感推测，均为浏览器可提供字段） */
export type ResumeNotifyExtras = {
	/** 复制成功后的文本（联系区邮箱/电话，站点已展示） */
	copiedText?: string;
	/** mailto 的 href（截断由服务端再做） */
	linkHref?: string;
	/** PDF 的 download 文件名 */
	downloadFilename?: string;
	/** PDF 下载链接（绝对 URL） */
	pdfHref?: string;
};

function collectBrowserContext() {
	if (typeof window === "undefined") return {};
	let platform = "";
	const uaData = (
		navigator as Navigator & { userAgentData?: { platform?: string } }
	).userAgentData;
	platform = uaData?.platform ?? navigator.platform ?? "";
	return {
		clientTime: new Date().toISOString(),
		pageUrl: window.location.href,
		referrer: document.referrer || "",
		userAgent: navigator.userAgent,
		language: navigator.language,
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
		viewport: `${window.innerWidth}x${window.innerHeight}`,
		screen: `${window.screen.width}x${window.screen.height}`,
		platform,
	};
}

/** 静默 fire-and-forget，不影响页面交互 */
export function notifyResumeEvent(
	type: ResumeNotifyEvent,
	extras?: ResumeNotifyExtras,
): void {
	if (typeof window === "undefined") return;

	const payload = {
		type,
		...collectBrowserContext(),
		...extras,
	};

	void fetch("/api/resume-notify", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	}).catch(() => {});
}
