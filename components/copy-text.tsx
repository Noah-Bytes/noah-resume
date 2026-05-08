"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";
import meta from "@/lib/meta";
import { cn } from "@/lib/utils";

const { copyText } = meta.ui;

type Props = {
	value: string;
	label?: string;
	className?: string;
};

export function CopyText({ value, label, className }: Props) {
	const [copied, setCopied] = React.useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			/* no-op */
		}
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			aria-label={
				copied
					? copyText.copiedAria
					: `${copyText.copyVerbPrefix} ${label ?? value}`
			}
			className={cn(
				"group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
				className,
			)}
		>
			<span className="tabular">{label ?? value}</span>
			{copied ? (
				<Check
					className="size-3.5 text-accent transition-transform"
					aria-hidden
				/>
			) : (
				<Copy
					className="size-3.5 transition-transform group-hover:scale-110"
					aria-hidden
				/>
			)}
			<span className="sr-only" aria-live="polite">
				{copied ? copyText.liveCopied : ""}
			</span>
		</button>
	);
}
