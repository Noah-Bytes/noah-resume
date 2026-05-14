"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import meta from "@/lib/meta";
import { cn } from "@/lib/utils";

const { resume, ui } = meta;
const { profile } = resume;

export function SiteHeader() {
	const { navigation: navItems, header, resumePdf } = ui;
	const [active, setActive] = useState<string>("now");
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		console.log("useEffect");
		const ids = navItems.map((n) => n.id);
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (sections.length === 0) return;

		const io = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
		);
		for (const s of sections) {
			io.observe(s);
		}
		return () => io.disconnect();
	}, []);

	return (
		<header
			className={cn(
				"no-print fixed inset-x-0 top-0 z-50 transition-colors duration-300",
				scrolled
					? "border-b border-border/60 bg-background/75 backdrop-blur-lg"
					: "border-b border-transparent",
			)}
		>
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
				<a href="#top" className="group flex items-center gap-2.5">
					<Image
						src="/logo.svg"
						alt={`${profile.name} · 站点标识`}
						width={28}
						height={28}
						priority
						className="size-7 shrink-0 rounded-md object-cover transition-transform group-hover:-rotate-6"
					/>
					<div className="hidden flex-col leading-tight sm:flex">
						<span className="text-[13px] font-medium tracking-tight">
							{profile.name}{" "}
							<span className="text-muted-foreground">
								/ {profile.englishName}
							</span>
						</span>
						<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
							{header.roleSubtitle}
						</span>
					</div>
				</a>

				<nav
					className="hidden items-center gap-1 md:flex"
					aria-label={header.navAriaLabel}
				>
					{navItems.map((item) => {
						const isActive = active === item.id;
						return (
							<a
								key={item.id}
								href={`#${item.id}`}
								className={cn(
									"group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors",
									isActive
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground",
								)}
							>
								<span
									className={cn(
										"tabular font-mono text-[10px] transition-colors",
										isActive ? "text-accent" : "text-muted-foreground/70",
									)}
								>
									{item.num}
								</span>
								<span>{item.label}</span>
								{isActive ? (
									<span
										aria-hidden
										className="absolute inset-x-2 bottom-0 h-px bg-foreground/80"
									/>
								) : null}
							</a>
						);
					})}
				</nav>

				<div className="flex items-center gap-2">
					<a
						href={`mailto:${profile.email}`}
						className="hidden rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground sm:inline-flex"
					>
						{profile.email}
					</a>
					<a
						href={encodeURI(resumePdf.path)}
						download={resumePdf.downloadFilename}
						className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
						aria-label={header.printAriaLabel}
					>
						<span className="font-mono">{header.pdfLabel}</span>
						<span aria-hidden>↓</span>
					</a>
				</div>
			</div>
		</header>
	);
}
