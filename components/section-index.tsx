import { cn } from "@/lib/utils";

type Props = {
	children: React.ReactNode;
	className?: string;
	/** 视差速度，0.1 - 0.5 之间较合适 */
	speed?: number;
	/** 文字定位 */
	align?: "left" | "right";
	/** 是否使用衬线斜体 */
	italic?: boolean;
};

/**
 * 巨型 section 衬底字符：装饰性的大数字 / 关键词，
 * 通过 data-parallax-y 在滚动时纵向漂移。
 * 不参与可访问性树，纯视觉。
 */
export function SectionIndex({
	children,
	className,
	speed = 0.18,
	align = "right",
	italic = false,
}: Props) {
	return (
		<div
			aria-hidden
			className={cn(
				"pointer-events-none absolute inset-x-0 top-0 z-0 flex select-none",
				align === "right" ? "justify-end" : "justify-start",
				className,
			)}
		>
			<span
				data-parallax-y
				data-speed={speed}
				className={cn(
					"-mr-2 -mt-6 whitespace-nowrap text-[clamp(7rem,18vw,18rem)] font-medium leading-[0.85] tracking-tighter",
					"text-foreground/[0.045]",
					italic ? "font-serif italic text-foreground/[0.06]" : "font-sans",
					align === "left" && "-ml-2 mr-0",
				)}
				style={{
					WebkitTextStroke: italic
						? undefined
						: "1px color-mix(in oklch, var(--foreground) 8%, transparent)",
					color: italic ? undefined : "transparent",
				}}
			>
				{children}
			</span>
		</div>
	);
}
