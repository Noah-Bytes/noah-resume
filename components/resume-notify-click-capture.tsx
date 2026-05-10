"use client";

import * as React from "react";
import { notifyResumeEvent } from "@/lib/resume-notify-client";

/**
 * 在捕获阶段监听点击：mailto → 发送邮件；带 download 属性 → PDF 下载。
 * 避免在 <a> 上挂 onClick 触发 a11y lint，逻辑集中在一处。
 */
export function ResumeNotifyClickCapture() {
	React.useEffect(() => {
		const onClickCapture = (e: MouseEvent) => {
			const a = (e.target as Element | null)?.closest?.("a");
			if (!a || !(a instanceof HTMLAnchorElement)) return;

			const href = a.getAttribute("href") ?? "";
			if (href.startsWith("mailto:")) {
				notifyResumeEvent("mailto_click", { linkHref: a.href });
				return;
			}
			if (a.hasAttribute("download")) {
				const name = a.getAttribute("download") ?? "";
				notifyResumeEvent("pdf_download", {
					downloadFilename: name || undefined,
					pdfHref: a.href,
				});
			}
		};

		document.addEventListener("click", onClickCapture, true);
		return () => document.removeEventListener("click", onClickCapture, true);
	}, []);

	return null;
}
