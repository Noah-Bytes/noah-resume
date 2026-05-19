import { ArrowDownRight, MapPin } from "lucide-react";
import { CopyText } from "@/components/copy-text";
import { HeroBackdrop } from "@/components/hero-backdrop";
import meta from "@/lib/meta";

const { resume, ui } = meta;
const { profile, stats, jobIntent } = resume;

export function HeroSection() {
	const { hero } = ui;

	return (
		<section
			id="top"
			data-parallax-scope
			className="relative overflow-hidden border-b border-border/60 pb-20 pt-32 md:pb-28 md:pt-40"
		>
			<div
				aria-hidden
				className="bg-hairline absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
			/>
			<HeroBackdrop />
			<div className="noise relative mx-auto max-w-6xl px-5 md:px-8">
				<div className="flex flex-wrap items-center gap-3 text-xs animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
					<span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 backdrop-blur">
						<span className="relative grid size-2 place-items-center">
							<span className="pulse-dot absolute inset-0 rounded-full bg-accent" />
							<span className="relative size-2 rounded-full bg-accent" />
						</span>
						<span className="font-mono uppercase tracking-[0.16em] text-muted-foreground">
							{hero.openToPrefix} {jobIntent.openToEn}
						</span>
					</span>
					<span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.16em] text-muted-foreground">
						<MapPin className="size-3" aria-hidden />
						{profile.location}
					</span>
					<span
						className="hidden h-px w-10 bg-border md:inline-block"
						aria-hidden
					/>
					<span className="hidden font-mono uppercase tracking-[0.16em] text-muted-foreground md:inline">
						{hero.currentlyBuildingPrefix} {profile.currentlyBuilding}
					</span>
				</div>

				<div className="mt-12 grid grid-cols-12 gap-y-10">
					<div className="col-span-12 lg:col-span-8">
						<p
							className="eyebrow animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
							style={{ animationDelay: "80ms", animationFillMode: "both" }}
						>
							{hero.portfolioEyebrow}
						</p>

						<h1
							className="mt-4 text-balance text-[2.6rem] font-medium leading-[1.02] tracking-tight md:text-7xl lg:text-[5.4rem] animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
							style={{ animationDelay: "120ms", animationFillMode: "both" }}
						>
							{hero.introHiPrefix}{" "}
							<span className="serif-italic text-accent">
								{profile.englishName}
							</span>
							<span className="text-muted-foreground/50">
								{" "}
								{hero.introNameMiddle}
							</span>{" "}
							<span className="whitespace-nowrap">{profile.name}</span>
							<span className="text-accent">.</span>
						</h1>

						<p
							className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
							style={{ animationDelay: "200ms", animationFillMode: "both" }}
						>
							<span className="serif-italic text-foreground">
								{profile.tagline}
							</span>
							<span className="mt-1 block text-base md:mt-2 md:text-lg">
								{hero.bioContinuation}
							</span>
						</p>

						<div
							className="mt-10 flex flex-wrap items-center gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
							style={{ animationDelay: "280ms", animationFillMode: "both" }}
						>
							<a
								href="#projects"
								className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
							>
								{hero.ctaProjects}
								<ArrowDownRight
									className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
									aria-hidden
								/>
							</a>
							<a
								href="#contact"
								className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground/40"
							>
								{hero.ctaContact}
							</a>
							<CopyText value={profile.email} />
						</div>
					</div>

					<aside
						className="col-span-12 flex h-full flex-col justify-end gap-6 lg:col-span-4 lg:items-end lg:text-right animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
						style={{ animationDelay: "340ms", animationFillMode: "both" }}
					>
						<div className="space-y-1">
							<div className="eyebrow">{jobIntent.eyebrow}</div>
							<div className="font-serif text-2xl italic">
								{jobIntent.headline}
							</div>
						</div>
						<div className="hr-hairline w-full lg:w-44" />
						<p className="max-w-xs font-mono text-xs leading-relaxed text-muted-foreground">
							{hero.asideLines.map((line, i) => (
								<span key={line}>
									{i === 0 ? (
										<>
											<span className="text-accent">→</span>{" "}
										</>
									) : (
										<br />
									)}
									{line}
								</span>
							))}
						</p>
					</aside>
				</div>

				<div
					className="mt-20 grid grid-cols-2 divide-y divide-border border-y border-border md:grid-cols-4 md:divide-x md:divide-y-0 animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
					style={{ animationDelay: "400ms", animationFillMode: "both" }}
					data-stagger
				>
					{stats.map((s, i) => (
						<div
							key={s.label}
							className="relative flex flex-col gap-1 px-1 py-6 md:px-6 md:py-8"
						>
							<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
								/ {String(i + 1).padStart(2, "0")} · {s.label}
							</span>
							<div className="mt-2 flex items-baseline gap-1">
								<span
									data-counter
									data-counter-to={s.value}
									className="tabular text-4xl font-medium tracking-tight md:text-5xl"
								>
									0
								</span>
								<span className="text-base font-medium text-muted-foreground md:text-lg">
									{s.suffix}
								</span>
							</div>
							<span className="font-mono text-[11px] text-muted-foreground/80">
								{s.caption}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
