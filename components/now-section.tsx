import { ArrowDownRight, ArrowUpRight, Github } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import meta from "@/lib/meta";

const { resume, ui } = meta;
const { profile, projects } = resume;
const { now } = ui;

/** 优先展示 period 含「至今」的进行中项目（与项目精选同步） */
function getCurrentProject() {
	return projects.find((p) => p.period.includes("至今"));
}

export function NowSection() {
	const current = getCurrentProject();

	return (
		<section
			id="now"
			data-parallax-scope
			className="relative scroll-mt-20 overflow-hidden border-b border-border/60 bg-muted/20 py-16 md:py-20"
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-y-0 right-[-10%] -z-0 hidden w-[60%] md:block"
			>
				<div
					data-parallax-y
					data-speed="0.25"
					className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[clamp(5rem,12vw,9rem)] font-medium tracking-tighter"
					style={{
						WebkitTextStroke:
							"1px color-mix(in oklch, var(--accent) 22%, transparent)",
						color: "transparent",
					}}
				>
					NOW.
				</div>
			</div>
			<div className="relative mx-auto max-w-6xl px-5 md:px-8">
				<div data-reveal>
					<SectionHeading
						index="00"
						eyebrow={now.eyebrow}
						title={
							<>
								{now.titlePrefix}
								<span className="serif-italic text-accent">
									{profile.currentlyBuilding}
								</span>
								{now.titleSuffix}
							</>
						}
					/>
				</div>

				<div
					className="rounded-2xl border border-border bg-card/80 p-7 shadow-sm backdrop-blur-sm md:p-9"
					data-reveal
					data-reveal-delay="80"
				>
					<p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base">
						{current?.description ?? now.fallbackDescription}
					</p>

					{current?.tagline ? (
						<p className="mt-5 font-serif text-lg italic text-muted-foreground md:text-xl">
							{current.tagline}
						</p>
					) : null}

					{current?.highlights?.length ? (
						<ul className="mt-6 grid gap-3 text-[15px] leading-relaxed text-muted-foreground sm:grid-cols-2">
							{current.highlights.map((line, i) => (
								<li key={i.toString()} className="flex gap-3">
									<span
										aria-hidden
										className="mt-2 size-1 shrink-0 rounded-full bg-accent"
									/>
									<span>{line}</span>
								</li>
							))}
						</ul>
					) : null}

					{current?.stack?.length ? (
						<div className="mt-8">
							<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
								{now.stackEyebrow}
							</p>
							<div className="mt-3 flex flex-wrap gap-1.5">
								{current.stack.map((s) => (
									<span
										key={s}
										className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
									>
										{s}
									</span>
								))}
							</div>
						</div>
					) : null}

					<div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-6">
						{now.githubHref ? (
							<a
								href={now.githubHref}
								target="_blank"
								rel="noreferrer"
								className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-accent"
							>
								<span className="grid size-8 place-items-center rounded-full bg-accent/12 text-accent">
									<Github className="size-4" aria-hidden />
								</span>
								<span className="link-underline">{now.githubDisplayPath}</span>
								<ArrowUpRight
									className="size-4 shrink-0 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
									aria-hidden
								/>
							</a>
						) : null}
						<a
							href="#projects"
							className="group inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-foreground"
						>
							{now.ctaLabel}
							<ArrowDownRight
								className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
								aria-hidden
							/>
						</a>
						{current?.role ? (
							<span className="font-mono text-xs text-muted-foreground">
								{current.role} · {current.period}
							</span>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
}
