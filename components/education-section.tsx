import meta from "@/lib/meta";

const { resume, ui } = meta;
const { education } = resume;

export function EducationSection() {
	const { education: eduUi } = ui;

	return (
		<section
			id="education"
			className="border-b border-border/60 py-20 md:py-24"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="grid grid-cols-12 items-center gap-6 rounded-2xl border border-border bg-card p-7 md:gap-10 md:p-10 animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
					<div className="col-span-12 flex items-center gap-3 md:col-span-3">
						<span className="font-mono text-xs tracking-[0.2em] text-accent">
							{eduUi.index}
						</span>
						<span className="h-px flex-1 bg-border md:max-w-12" aria-hidden />
						<span className="eyebrow">{eduUi.eyebrow}</span>
					</div>
					<div className="col-span-12 md:col-span-7">
						<h3 className="text-2xl font-medium tracking-tight md:text-3xl">
							{education.school}
						</h3>
						<p className="mt-1 font-serif text-lg italic text-muted-foreground">
							{education.schoolEN}
						</p>
						<p className="mt-3 text-sm text-muted-foreground">
							{education.degree} · {education.major}
						</p>
					</div>
					<div className="col-span-12 md:col-span-2 md:text-right">
						<span className="tabular font-mono text-sm text-muted-foreground">
							{education.period}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
