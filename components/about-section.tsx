import { SectionHeading } from "@/components/section-heading";
import meta from "@/lib/meta";

const { resume, ui } = meta;
const { profile } = resume;
const { about } = ui;

export function AboutSection() {
	return (
		<section
			id="about"
			className="relative scroll-mt-20 border-b border-border/60 py-24 md:py-32"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
					<SectionHeading
						index="01"
						eyebrow={about.eyebrow}
						title={
							<>
								{about.titlePrefix}
								<span className="serif-italic text-accent">
									{" "}
									{about.titleAccent}{" "}
								</span>
								{about.titleSuffix}
							</>
						}
						description={profile.summary}
					/>
				</div>

				<div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
					{profile.manifesto.map((m, i) => (
						<article
							key={m.title}
							className="group relative flex h-full flex-col gap-3 bg-card p-7 transition-colors hover:bg-card/70 md:p-9 animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
							style={{
								animationDelay: `${i * 80}ms`,
								animationFillMode: "both",
							}}
						>
							<div className="flex items-center gap-3 text-muted-foreground">
								<span className="font-mono text-xs tracking-[0.2em] text-accent">
									/{String(i + 1).padStart(2, "0")}
								</span>
								<span className="h-px w-8 bg-border transition-all group-hover:w-12 group-hover:bg-foreground/40" />
							</div>
							<h3 className="text-xl font-medium tracking-tight md:text-2xl">
								{m.title}
							</h3>
							<p className="text-pretty leading-relaxed text-muted-foreground">
								{m.body}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
