import { cn } from "@/lib/utils";

type Props = {
	items: string[];
	className?: string;
	variant?: "default" | "accent";
};

/**
 * 在 section 之间穿插的"动力学"文字带：
 * - 文字本身横向无限滚动（CSS marquee）
 * - 整个 band 跟随滚动速度产生 skewY，营造 kinetic 视觉冲击
 * - 大尺寸衬线斜体 + mono 标签混排，保持编辑感
 */
export function KineticBand({ items, className, variant = "default" }: Props) {
	const repeated = [...items, ...items, ...items, ...items];

	return (
		<div
			className={cn(
				"relative overflow-hidden border-y border-border/60 py-8 md:py-12",
				variant === "accent" ? "bg-accent/[0.06]" : "bg-card/40",
				className,
			)}
			data-velocity-skew
			data-max-skew="6"
		>
			<div className="marquee-mask">
				<div className="animate-marquee flex w-max gap-12 whitespace-nowrap will-change-transform">
					{repeated.map((it, i) => (
						<span
							key={`${it}-${i.toString()}`}
							className="inline-flex items-baseline gap-6 font-serif text-[clamp(2.5rem,8vw,7rem)] italic leading-none tracking-tight"
						>
							<span
								className={cn(
									variant === "accent" ? "text-accent" : "text-foreground/85",
								)}
							>
								{it}
							</span>
							<span
								aria-hidden
								className="size-3 rounded-full bg-accent/80 md:size-4"
							/>
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
