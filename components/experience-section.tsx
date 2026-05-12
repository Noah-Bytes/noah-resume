import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import meta from "@/lib/meta";

const { resume, ui } = meta;
const { experiences } = resume;

export function ExperienceSection() {
	const { experience: expUi } = ui;
	return (
		<section
			id="experience"
			className="relative scroll-mt-20 border-b border-border/60 py-24 md:py-32"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
					<SectionHeading
						index="03"
						eyebrow={expUi.eyebrow}
						title={
							<>
								{expUi.titlePrefix}
								<span className="serif-italic text-accent">
									{expUi.titleAccent}
								</span>
								{expUi.titleSuffix}
							</>
						}
						description={expUi.description}
					/>
				</div>

				<div className="grid grid-cols-12 gap-x-6">
					{/* Sticky meta column */}
					<aside className="col-span-12 mb-10 md:col-span-3 md:mb-0">
						<div className="md:sticky md:top-24">
							<div className="rounded-2xl border border-border bg-card p-5">
								<p className="eyebrow">{expUi.sidebarEyebrow}</p>
								<p className="mt-3 font-serif text-3xl italic leading-tight">
									{expUi.sidebarRange}
								</p>
								<p className="mt-2 font-mono text-xs text-muted-foreground">
									{expUi.sidebarCaption}
								</p>
								<div className="hr-hairline my-5" />
								<ul className="space-y-2 text-sm">
									{experiences.map((e) => (
										<li
											key={`${e.company}-${e.period}`}
											className="flex items-baseline gap-2 text-muted-foreground"
										>
											<span
												aria-hidden
												className={
													e.current
														? "size-1.5 rounded-full bg-accent"
														: "size-1.5 rounded-full bg-border"
												}
											/>
											<span className="tabular font-mono text-[11px]">
												{e.period.split(" — ")[0].slice(0, 4)}
											</span>
											<span className="truncate">{e.role}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</aside>

					{/* Timeline */}
					<div className="relative col-span-12 md:col-span-9">
						<div
							aria-hidden
							className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent"
						/>
						<ol className="flex flex-col gap-12">
							{experiences.map((exp, idx) => (
								<li
									key={`${exp.company}-${idx.toString()}`}
									className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
									style={{
										animationDelay: `${idx * 80}ms`,
										animationFillMode: "both",
									}}
								>
									<div className="relative pl-8 md:pl-10">
										<div className="absolute left-0 top-1.5 grid size-4 place-items-center">
											{exp.current ? (
												<>
													<span className="pulse-dot absolute size-3 rounded-full bg-accent/80" />
													<span className="relative size-2.5 rounded-full bg-accent" />
												</>
											) : (
												<span className="size-2.5 rounded-full border border-foreground bg-background" />
											)}
										</div>

										<div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
											<span className="tabular font-mono text-xs text-muted-foreground">
												{exp.period}
											</span>
											{exp.current ? (
												<span className="rounded-full bg-accent/12 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
													{expUi.currentBadge}
												</span>
											) : null}
											{exp.meta ? (
												<>
													<span
														aria-hidden
														className="hidden h-px w-6 bg-border sm:inline-block"
													/>
													<span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
														{exp.meta}
													</span>
												</>
											) : null}
										</div>

										<h3 className="mt-3 text-2xl font-medium tracking-tight md:text-[1.75rem]">
											<span>{exp.role}</span>
											<span className="mx-2 text-muted-foreground/40">·</span>
											<span className="serif-italic text-muted-foreground">
												{exp.company}
											</span>
										</h3>

										{exp.productLinks?.length ? (
											<div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
												{exp.productLinks.map((link) => (
													<a
														key={link.href}
														href={link.href}
														target="_blank"
														rel="noreferrer"
														className="group inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-accent"
													>
														<span className="link-underline">{link.label}</span>
														<ArrowUpRight
															className="size-3 shrink-0 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
															aria-hidden
														/>
													</a>
												))}
											</div>
										) : null}

										<ul className="mt-5 grid gap-x-8 gap-y-2.5 text-[15px] leading-relaxed text-muted-foreground sm:grid-cols-2">
											{exp.highlights.map((h, i) => (
												<li key={i.toString()} className="flex gap-3">
													<span
														aria-hidden
														className="mt-2.5 size-1 shrink-0 rounded-full bg-accent"
													/>
													<span>{h}</span>
												</li>
											))}
										</ul>
									</div>
								</li>
							))}
						</ol>
					</div>
				</div>
			</div>
		</section>
	);
}
