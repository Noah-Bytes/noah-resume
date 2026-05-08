import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import meta from "@/lib/meta";
import { cn } from "@/lib/utils";

const { resume, ui } = meta;
const { projects } = resume;

export function ProjectsSection() {
	const { projects: projUi } = ui;
	const featured = projects.filter((p) => p.featured);
	const rest = projects.filter((p) => !p.featured);

	return (
		<section
			id="projects"
			className="relative scroll-mt-20 border-b border-border/60 py-24 md:py-32"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
					<SectionHeading
						index="04"
						eyebrow={projUi.eyebrow}
						title={
							<>
								{projUi.titleLead}
								<span className="serif-italic text-accent">
									{" "}
									{projUi.titleAccent}{" "}
								</span>
								{projUi.titleTrail}
							</>
						}
						description={projUi.description}
					/>
				</div>

				{/* Featured: 2 large cards */}
				<div className="grid gap-6 lg:grid-cols-2">
					{featured.map((p, i) => (
						<div
							key={p.name}
							className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
							style={{
								animationDelay: `${i * 80}ms`,
								animationFillMode: "both",
							}}
						>
							<FeaturedCard project={p} copy={projUi} />
						</div>
					))}
				</div>

				{/* Rest: dense table-like list */}
				<div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
					<div className="grid grid-cols-12 gap-4 border-b border-border bg-background/60 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:px-8">
						<span className="col-span-1">{projUi.tableHeaders.no}</span>
						<span className="col-span-5 sm:col-span-4">
							{projUi.tableHeaders.project}
						</span>
						<span className="col-span-5 hidden sm:col-span-3 sm:block">
							{projUi.tableHeaders.tagline}
						</span>
						<span className="hidden md:col-span-2 md:block">
							{projUi.tableHeaders.period}
						</span>
						<span className="col-span-6 text-right sm:col-span-2">
							{projUi.tableHeaders.stack}
						</span>
					</div>
					<ul>
						{rest.map((p, i) => (
							<li
								key={p.name}
								className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
								style={{
									animationDelay: `${i * 40}ms`,
									animationFillMode: "both",
								}}
							>
								<details className="group border-b border-border last:border-b-0">
									<summary className="grid cursor-pointer list-none grid-cols-12 items-center gap-4 px-6 py-5 transition-colors hover:bg-background/60 md:px-8 [&::-webkit-details-marker]:hidden">
										<span className="tabular col-span-1 font-mono text-xs text-muted-foreground">
											{String(i + 3).padStart(2, "0")}
										</span>
										<span className="col-span-5 flex items-center gap-2 sm:col-span-4">
											<span className="text-base font-medium tracking-tight md:text-lg">
												{p.name}
											</span>
											<ArrowUpRight
												className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-open:rotate-45"
												aria-hidden
											/>
										</span>
										<span className="col-span-5 hidden truncate text-sm text-muted-foreground sm:col-span-3 sm:block">
											{p.tagline}
										</span>
										<span className="tabular hidden font-mono text-xs text-muted-foreground md:col-span-2 md:block">
											{p.period}
										</span>
										<span className="col-span-6 truncate text-right font-mono text-[11px] text-muted-foreground sm:col-span-2">
											{p.stack.slice(0, 2).join(" · ")}
										</span>
									</summary>
									<div className="grid gap-6 border-t border-border bg-background/40 px-6 pb-7 pt-5 md:grid-cols-3 md:px-8">
										<div className="md:col-span-2">
											<p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">
												{p.description}
											</p>
											<ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
												{p.highlights.map((h, idx) => (
													<li key={idx.toString()} className="flex gap-2.5">
														<span
															aria-hidden
															className="mt-2 size-1 shrink-0 rounded-full bg-accent"
														/>
														<span>{h}</span>
													</li>
												))}
											</ul>
										</div>
										<div className="space-y-4">
											{p.metrics ? (
												<div className="rounded-xl border border-border bg-card p-4">
													<p className="eyebrow mb-3">
														{projUi.outcomeEyebrow}
													</p>
													<div className="grid grid-cols-3 gap-2">
														{p.metrics.map((m) => (
															<div key={m.label} className="flex flex-col">
																<span className="tabular text-base font-medium tracking-tight">
																	{m.value}
																</span>
																<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
																	{m.label}
																</span>
															</div>
														))}
													</div>
												</div>
											) : null}
											<div>
												<p className="eyebrow mb-2">{projUi.stackEyebrow}</p>
												<div className="flex flex-wrap gap-1.5">
													{p.stack.map((s) => (
														<span
															key={s}
															className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
														>
															{s}
														</span>
													))}
												</div>
											</div>
										</div>
									</div>
								</details>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

function FeaturedCard({
	project: p,
	copy,
}: {
	project: (typeof projects)[number];
	copy: typeof ui.projects;
}) {
	return (
		<article
			className={cn(
				"group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all",
				"hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]",
			)}
		>
			<div className="relative flex-1 p-7 md:p-9">
				<div className="flex items-start justify-between gap-4">
					<span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
						{copy.featuredBadge}
					</span>
					<span className="tabular font-mono text-xs text-muted-foreground">
						{p.period}
					</span>
				</div>

				<div className="mt-6 flex items-start gap-3">
					<h3 className="text-3xl font-medium tracking-tight md:text-4xl">
						{p.name}
					</h3>
					<ArrowUpRight
						className="mt-2 size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
						aria-hidden
					/>
				</div>
				<p className="mt-1 font-serif text-lg italic text-muted-foreground">
					{p.tagline}
				</p>

				<p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
					{p.description}
				</p>

				{p.metrics ? (
					<div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
						{p.metrics.map((m) => (
							<div
								key={m.label}
								className="flex flex-col gap-1 bg-card px-4 py-4"
							>
								<span className="tabular text-2xl font-medium tracking-tight">
									{m.value}
								</span>
								<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
									{m.label}
								</span>
							</div>
						))}
					</div>
				) : null}

				<ul className="mt-6 flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
					{p.highlights.map((h, i) => (
						<li key={i.toString()} className="flex gap-2.5">
							<span
								aria-hidden
								className="mt-2 size-1 shrink-0 rounded-full bg-accent"
							/>
							<span>{h}</span>
						</li>
					))}
				</ul>
			</div>

			<div className="border-t border-border bg-background/60 px-7 py-4 md:px-9">
				<div className="flex flex-wrap gap-1.5">
					{p.stack.map((s) => (
						<span
							key={s}
							className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
						>
							{s}
						</span>
					))}
				</div>
			</div>
		</article>
	);
}
