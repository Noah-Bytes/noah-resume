"use client";

import meta from "@/lib/meta";
import { cn } from "@/lib/utils";

type Props = {
	label?: string;
	className?: string;
};

export function PrintButton({
	label = meta.ui.printButton.defaultLabel,
	className,
}: Props) {
	return (
		<button
			type="button"
			onClick={() => {
				if (typeof window !== "undefined") window.print();
			}}
			className={cn(
				"inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90",
				className,
			)}
		>
			<span className="font-mono">{label}</span>
			<span aria-hidden>↓</span>
		</button>
	);
}
