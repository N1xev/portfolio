
'use client';
import { Header } from './header';
import { AboutSection } from './about-section';
import { SkillsSection } from './skills-section';
import { ProjectsSection } from './projects-section';

interface PortfolioPageProps {
    onSwitch?: () => void;
}

export function PortfolioPage({ onSwitch }: PortfolioPageProps) {
    return (
        <div className="h-full overflow-y-auto bg-background text-foreground">
            <Header onSwitch={onSwitch} />
            <main className="flex flex-col items-center">
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
            </main>
        </div>
    );
}
