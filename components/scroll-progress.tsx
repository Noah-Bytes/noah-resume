"use client";

import { useLayoutEffect, useState } from "react";

function getScrollProgress() {
	if (typeof window === "undefined") return 0;

	const scrollTop = window.scrollY;
	const docHeight = document.documentElement.scrollHeight - window.innerHeight;
	const value = docHeight > 0 ? scrollTop / docHeight : 0;
	return Math.min(1, Math.max(0, value));
}

export function ScrollProgress() {
	// 固定初值 0，避免 SSR 为 0、客户端首帧已带 scroll 导致 hydration mismatch
	const [progress, setProgress] = useState(0);

	useLayoutEffect(() => {
		let ticking = false;

		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					setProgress(getScrollProgress());
					ticking = false;
				});
				ticking = true;
			}
		};

		setProgress(getScrollProgress());

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	return (
		<div
			aria-hidden
			className="no-print fixed left-0 right-0 top-0 z-[60] h-px bg-transparent"
		>
			<div
				className="h-full origin-left bg-accent transition-[transform] duration-150 ease-out"
				style={{ transform: `scaleX(${progress})`, width: "100%" }}
			/>
		</div>
	);
}
