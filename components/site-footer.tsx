import meta from "@/lib/meta";

const { resume, ui } = meta;
const { profile } = resume;

export function SiteFooter() {
	const year = String(new Date().getFullYear());
	const rights = ui.footer.rightsTemplate.replace("{year}", year);

	return (
		<footer className="border-t border-border/60 bg-card/40">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-8">
				<div className="flex items-center gap-3">
					<span className="grid size-8 place-items-center rounded-md bg-foreground text-background">
						<span className="font-serif text-base italic leading-none">N</span>
					</span>
					<div className="flex flex-col leading-tight">
						<span className="text-sm font-medium tracking-tight">
							{profile.name}{" "}
							<span className="text-muted-foreground">
								/ {profile.englishName}
							</span>
						</span>
						<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
							{rights}
						</span>
					</div>
				</div>

				<p className="font-mono text-xs leading-relaxed text-muted-foreground">
					{ui.footer.colophon}
				</p>
			</div>
		</footer>
	);
}
