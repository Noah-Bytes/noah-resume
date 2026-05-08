"use client";

import * as React from "react";

export function ScrollProgress() {
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const onScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const value = docHeight > 0 ? scrollTop / docHeight : 0;
			setProgress(Math.min(1, Math.max(0, value)));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
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
