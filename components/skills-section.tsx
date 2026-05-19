import { SectionHeading } from "@/components/section-heading";
import { SectionIndex } from "@/components/section-index";
import { TechMarquee } from "@/components/tech-marquee";
import meta from "@/lib/meta";

const { resume, ui } = meta;
const { skillGroups, techMarqueeItems } = resume;
const { skills } = ui;

export function SkillsSection() {
	return (
		<section
			id="skills"
			data-parallax-scope
			className="relative scroll-mt-20 overflow-hidden border-b border-border/60 py-24 md:py-32"
		>
			<SectionIndex align="left" italic>
				stack
			</SectionIndex>
			<div className="relative mx-auto max-w-6xl px-5 md:px-8">
				<div data-reveal>
					<SectionHeading
						index="02"
						eyebrow={skills.eyebrow}
						title={
							<>
								{skills.titlePrefix}
								<span className="serif-italic text-accent">
									{" "}
									{skills.titleAccent}
								</span>
								{skills.titleSuffix}
							</>
						}
						description={skills.description}
					/>
				</div>

				{/* Masonry grid with parallax */}
				<div className="mt-8 space-y-6 md:space-y-8">
					{skillGroups.map((group, i) => {
						const isOdd = i % 2 === 1;
						const speed = 0.15 + i * 0.02;
						return (
							<div
								key={group.title}
								className={`group/skill relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-border/80 hover:shadow-lg md:p-8 ${
									isOdd ? "md:ml-[12%]" : "md:mr-[12%]"
								}`}
								data-parallax-y
								data-speed={speed.toString()}
								data-reveal
								data-reveal-delay={`${i * 80}`}
							>
								{/* Parallax background accent */}
								<div
									aria-hidden
									className="absolute -right-12 -top-8 -z-0 h-32 w-32 rounded-full bg-accent/5 blur-2xl transition-opacity group-hover/skill:opacity-0"
									data-parallax-y
									data-speed={(speed * 1.5).toString()}
								/>

								<div className="relative flex flex-col gap-6 md:gap-8">
									{/* Header */}
									<div className="flex items-start justify-between gap-4">
										<div className="flex items-start gap-3">
											<span className="tabular shrink-0 font-mono text-xs text-accent">
												/{String(i + 1).padStart(2, "0")}
											</span>
											<div className="flex flex-col gap-1">
												<h3 className="font-serif text-2xl italic tracking-tight md:text-3xl">
													{group.title}
												</h3>
												<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
													{group.titleCN}
												</p>
											</div>
										</div>
									</div>

									{/* Tech tags with stagger */}
									<ul
										className="flex flex-wrap gap-x-2 gap-y-3"
										data-stagger
										data-stagger-delay="40"
									>
										{group.items.map((item, idx) => (
											<li
												key={item}
												className="group/tag relative inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/40 px-3 py-1.5 text-sm transition-all hover:border-accent/50 hover:bg-background/80 hover:text-accent"
												style={{
													transitionDelay: `${idx * 20}ms`,
												}}
											>
												<span
													aria-hidden
													className="size-1 rounded-full bg-muted-foreground/30 transition-colors group-hover/tag:bg-accent"
												/>
												{item}
											</li>
										))}
									</ul>
								</div>

								{/* Subtle line accent */}
								<div
									aria-hidden
									className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent/30 via-accent/10 to-transparent"
								/>
							</div>
						);
					})}
				</div>

				{/* Marquee */}
				<div
					className="mt-16 border-y border-border bg-card"
					data-reveal
					data-reveal-delay="400"
				>
					<TechMarquee items={techMarqueeItems} />
				</div>
			</div>
		</section>
	);
}
