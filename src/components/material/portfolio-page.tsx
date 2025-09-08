
'use client';
import { motion } from 'framer-motion';
import { Header } from './header';
import { AboutSection } from './about-section';
import { SkillsSection } from './skills-section';
import { ProjectsSection } from './projects-section';

interface PortfolioPageProps {
    onSwitch?: () => void;
}

export function PortfolioPage({ onSwitch }: PortfolioPageProps) {
    return (
        <motion.div
            key="material-portfolio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full"
        >
            <div className="h-full overflow-y-auto bg-background text-foreground">
                <Header onSwitch={onSwitch} />
                <main>
                    <AboutSection />
                    <SkillsSection />
                    <ProjectsSection />
                </main>
            </div>
        </motion.div>
    );
}
