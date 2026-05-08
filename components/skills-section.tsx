import { SectionHeading } from "@/components/section-heading";
import { TechMarquee } from "@/components/tech-marquee";
import meta from "@/lib/meta";

const { resume, ui } = meta;
const { skillGroups, techMarqueeItems } = resume;
const { skills } = ui;

export function SkillsSection() {
	return (
		<section
			id="skills"
			className="relative scroll-mt-20 border-b border-border/60 py-24 md:py-32"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
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

				<div className="overflow-hidden rounded-2xl border border-border bg-card">
					{skillGroups.map((group, i) => (
						<div
							key={group.title}
							className="grid grid-cols-12 gap-6 border-b border-border px-6 py-7 last:border-b-0 md:px-10 md:py-9 animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
							style={{
								animationDelay: `${i * 60}ms`,
								animationFillMode: "both",
							}}
						>
							<div className="col-span-12 flex items-start gap-3 md:col-span-4">
								<span className="tabular mt-1 font-mono text-xs text-accent">
									/{String(i + 1).padStart(2, "0")}
								</span>
								<div className="flex flex-col gap-1">
									<h3 className="font-serif text-2xl italic tracking-tight">
										{group.title}
									</h3>
									<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
										{group.titleCN}
									</p>
								</div>
							</div>
							<div className="col-span-12 md:col-span-8">
								<ul className="flex flex-wrap gap-x-1.5 gap-y-2">
									{group.items.map((item) => (
										<li
											key={item}
											className="group relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:text-accent"
										>
											<span
												aria-hidden
												className="size-1 rounded-full bg-muted-foreground/40 transition-colors group-hover:bg-accent"
											/>
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>

				{/* Marquee */}
				<div
					className="mt-12 border-y border-border bg-card animate-in fade-in-0 duration-700 delay-200"
					style={{ animationFillMode: "both" }}
				>
					<TechMarquee items={techMarqueeItems} />
				</div>
			</div>
		</section>
	);
}
