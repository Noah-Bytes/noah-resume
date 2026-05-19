/**
 * Hero 远景视差层：
 * - 巨大的 mono 网格关键词（PORTFOLIO / 2026 / ENGINEER）
 * - 背景柔光斑
 * 整体随滚动慢速上移，给前景内容让出焦点。
 */
export function HeroBackdrop() {
	return (
		<div
			aria-hidden
			data-parallax-scope
			className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
		>
			{/* 远景巨型字 */}
			<div
				data-parallax-y
				data-speed="0.35"
				className="absolute inset-x-0 top-[8%] flex justify-between px-2 md:px-6"
			>
				<span
					className="font-mono text-[clamp(4rem,14vw,12rem)] font-medium leading-[0.85] tracking-tighter text-foreground/[0.04]"
					style={{
						WebkitTextStroke:
							"1px color-mix(in oklch, var(--foreground) 7%, transparent)",
						color: "transparent",
					}}
				>
					PORTFOLIO
				</span>
				<span
					className="hidden font-mono text-[clamp(4rem,14vw,12rem)] font-medium leading-[0.85] tracking-tighter text-foreground/[0.04] md:inline"
					style={{
						WebkitTextStroke:
							"1px color-mix(in oklch, var(--foreground) 7%, transparent)",
						color: "transparent",
					}}
				>
					2026
				</span>
			</div>

			{/* 中景斜体词 */}
			<div
				data-parallax-y
				data-speed="0.18"
				className="absolute inset-x-0 bottom-[6%] hidden md:flex md:justify-end md:px-10"
			>
				<span className="font-serif text-[clamp(5rem,12vw,10rem)] italic leading-none tracking-tight text-foreground/[0.05]">
					engineer.
				</span>
			</div>

			{/* 旋转十字标线（构造主义） */}
			<div
				data-scrub-rotate
				data-rotate="20"
				className="absolute left-[8%] top-[28%] hidden size-32 md:block"
			>
				<div className="absolute inset-0 rounded-full border border-foreground/10" />
				<div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/10" />
				<div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-foreground/10" />
				<span className="absolute -bottom-6 right-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
					/ N · 33.7°
				</span>
			</div>

			{/* 柔光 */}
			<div
				data-parallax-y
				data-speed="0.5"
				className="absolute -top-20 right-[-10%] size-[420px] rounded-full bg-accent/15 blur-3xl"
			/>
			<div
				data-parallax-y
				data-speed="0.2"
				className="absolute bottom-[10%] left-[-5%] size-[320px] rounded-full bg-accent/[0.05] blur-3xl"
			/>
		</div>
	);
}
