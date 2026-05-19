import { ArrowUpRight, Github, Mail, MapPin, Phone, Send } from "lucide-react";
import { CopyText } from "@/components/copy-text";
import { PrintButton } from "@/components/print-button";
import meta from "@/lib/meta";

const { resume, ui } = meta;
const { profile, jobIntent } = resume;

export function ContactSection() {
	const { contact } = ui;

	return (
		<section
			id="contact"
			data-parallax-scope
			className="relative scroll-mt-20 overflow-hidden py-24 md:py-32"
		>
			<div
				aria-hidden
				className="bg-dots pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]"
			/>
			<div
				aria-hidden
				data-parallax-y
				data-speed="0.3"
				className="absolute inset-x-0 top-1/2 -z-0 mx-auto h-72 max-w-3xl -translate-y-1/2 rounded-full bg-accent/8 blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 bottom-[-2rem] flex justify-center"
			>
				<span
					data-parallax-y
					data-speed="0.35"
					className="font-serif text-[clamp(6rem,18vw,16rem)] italic leading-none tracking-tight text-accent/[0.08]"
				>
					let&apos;s talk.
				</span>
			</div>

			<div className="relative mx-auto max-w-5xl px-5 md:px-8">
				<div className="flex flex-col items-start gap-6 md:items-center md:text-center" data-reveal>
					<div className="flex items-center gap-3 text-muted-foreground">
						<span className="font-mono text-xs tracking-[0.2em] text-accent">
							{contact.index}
						</span>
						<span className="h-px w-12 bg-border" aria-hidden />
						<span className="eyebrow">{contact.eyebrow}</span>
					</div>
					<h2 className="max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
						{contact.titlePrefix}
						<span className="serif-italic text-accent">
							{" "}
							{contact.titleAccent}{" "}
						</span>
						<br className="hidden sm:inline" />
						{contact.titleSuffix}
					</h2>
					<p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
						{contact.bodyPrefix}{" "}
						<span className="text-foreground">{jobIntent.directionCN}</span>{" "}
						{contact.bodySuffix}
					</p>
				</div>

				<div
					className="mx-auto mt-12 grid w-full grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2"
					data-stagger
					data-stagger-delay="120"
				>
					<a
						href={`mailto:${profile.email}`}
						className="group flex items-center justify-between gap-4 bg-card px-6 py-6 transition-colors hover:bg-card/70"
					>
						<div className="flex items-center gap-4">
							<span className="grid size-10 place-items-center rounded-full bg-accent/12 text-accent">
								<Mail className="size-4" aria-hidden />
							</span>
							<div className="flex flex-col">
								<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
									{contact.labels.email}
								</span>
								<span className="link-underline text-sm">{profile.email}</span>
							</div>
						</div>
						<ArrowUpRight
							className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
							aria-hidden
						/>
					</a>

					<a
						href={`tel:${profile.phone}`}
						className="group flex items-center justify-between gap-4 bg-card px-6 py-6 transition-colors hover:bg-card/70"
					>
						<div className="flex items-center gap-4">
							<span className="grid size-10 place-items-center rounded-full bg-accent/12 text-accent">
								<Phone className="size-4" aria-hidden />
							</span>
							<div className="flex flex-col">
								<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
									{contact.labels.phone}
								</span>
								<span className="tabular link-underline text-sm">
									{profile.phoneDisplay}
								</span>
							</div>
						</div>
						<ArrowUpRight
							className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
							aria-hidden
						/>
					</a>

					<a
						href={profile.github}
						target="_blank"
						rel="noreferrer"
						className="group flex items-center justify-between gap-4 bg-card px-6 py-6 transition-colors hover:bg-card/70"
					>
						<div className="flex items-center gap-4">
							<span className="grid size-10 place-items-center rounded-full bg-accent/12 text-accent">
								<Github className="size-4" aria-hidden />
							</span>
							<div className="flex flex-col">
								<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
									{contact.labels.github}
								</span>
								<span className="link-underline text-sm">
									{contact.githubDisplayPath}
								</span>
							</div>
						</div>
						<ArrowUpRight
							className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
							aria-hidden
						/>
					</a>

					<a
						href={profile.telegram}
						target="_blank"
						rel="noreferrer"
						className="group flex items-center justify-between gap-4 bg-card px-6 py-6 transition-colors hover:bg-card/70"
					>
						<div className="flex items-center gap-4">
							<span className="grid size-10 place-items-center rounded-full bg-accent/12 text-accent">
								<Send className="size-4" aria-hidden />
							</span>
							<div className="flex flex-col">
								<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
									{contact.labels.telegram}
								</span>
								<span className="link-underline text-sm">
									{contact.telegramDisplayPath}
								</span>
							</div>
						</div>
						<ArrowUpRight
							className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
							aria-hidden
						/>
					</a>

					<div className="flex items-center justify-between gap-4 bg-card px-6 py-6 md:col-span-2">
						<div className="flex items-center gap-4">
							<span className="grid size-10 place-items-center rounded-full bg-accent/12 text-accent">
								<MapPin className="size-4" aria-hidden />
							</span>
							<div className="flex flex-col">
								<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
									{contact.labels.location}
								</span>
								<span className="text-sm">{profile.location}</span>
							</div>
						</div>
					</div>
				</div>

				<div
					className="mt-10 flex flex-wrap items-center justify-center gap-3"
					data-reveal
					data-reveal-delay="200"
				>
					<CopyText
						value={profile.email}
						label={contact.copyEmail}
						notifyEvent="copy_email"
					/>
					<CopyText
						value={profile.phone}
						label={contact.copyPhone}
						notifyEvent="copy_phone"
					/>
					<CopyText
						value={profile.telegram}
						label={contact.copyTelegram}
						notifyEvent="copy_telegram"
					/>
					<PrintButton />
				</div>
			</div>
		</section>
	);
}
