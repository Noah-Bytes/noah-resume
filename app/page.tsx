import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
	return (
		<div className="relative min-h-screen bg-background font-sans">
			<ScrollProgress />
			<SiteHeader />
			<main>
				<HeroSection />
				<AboutSection />
				<SkillsSection />
				<ExperienceSection />
				<ProjectsSection />
				<EducationSection />
				<ContactSection />
			</main>
			<SiteFooter />
		</div>
	);
}
