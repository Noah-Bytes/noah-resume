import { cn } from "@/lib/utils";

type Props = {
	items: string[];
	className?: string;
};

export function TechMarquee({ items, className }: Props) {
	// double the items for a seamless loop with translateX(-50%)
	const doubled = [...items, ...items];
	return (
		<div
			className={cn("marquee-mask relative w-full overflow-hidden", className)}
			aria-hidden
		>
			<div className="animate-marquee flex w-max items-center gap-x-10 whitespace-nowrap py-4">
				{doubled.map((item, i) => (
					<span
						key={`${item}-${i.toString()}`}
						className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground"
					>
						{item}
						<span className="ml-10 inline-block size-1 -translate-y-[3px] rounded-full bg-border align-middle" />
					</span>
				))}
			</div>
		</div>
	);
}
