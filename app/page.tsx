import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeroSection } from "@/components/hero-section";
import { KineticBand } from "@/components/kinetic-band";
import { NowSection } from "@/components/now-section";
import { ProjectsSection } from "@/components/projects-section";
import { ScrollFX } from "@/components/scroll-fx";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
	return (
		<div className="relative min-h-screen overflow-x-clip bg-background font-sans">
			<ScrollFX />
			<ScrollProgress />
			<SiteHeader />
			<main>
				<HeroSection />
				<NowSection />
				<KineticBand
					items={[
						"build",
						"ship",
						"refactor",
						"observe",
						"iterate",
						"systems thinking",
					]}
				/>
				<AboutSection />
				<SkillsSection />
				<KineticBand
					variant="accent"
					items={[
						"TypeScript",
						"Go",
						"Rust",
						"Kubernetes",
						"PostgreSQL",
						"distributed systems",
					]}
				/>
				<ExperienceSection />
				<ProjectsSection />
				<EducationSection />
				<ContactSection />
			</main>
			<SiteFooter />
		</div>
	);
}
