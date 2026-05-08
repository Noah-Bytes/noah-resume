import { cn } from "@/lib/utils";

type Props = {
	index: string;
	eyebrow: string;
	title: React.ReactNode;
	description?: React.ReactNode;
	className?: string;
};

export function SectionHeading({
	index,
	eyebrow,
	title,
	description,
	className,
}: Props) {
	return (
		<header className={cn("mb-12 md:mb-16", className)}>
			<div className="flex items-center gap-3 text-muted-foreground">
				<span className="font-mono text-xs tracking-[0.2em] text-accent">
					/{index}
				</span>
				<span className="h-px flex-1 max-w-16 bg-border" aria-hidden />
				<span className="eyebrow">{eyebrow}</span>
			</div>
			<h2 className="mt-5 max-w-3xl text-balance text-3xl font-medium tracking-tight md:text-5xl">
				{title}
			</h2>
			{description ? (
				<p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
					{description}
				</p>
			) : null}
		</header>
	);
}
