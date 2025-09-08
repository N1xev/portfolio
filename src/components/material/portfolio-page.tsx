
'use client';
import { motion } from 'framer-motion';
import { Header } from './header';
import { AboutSection } from './about-section';
import { SkillsSection } from './skills-section';
import { ProjectsSection } from './projects-section';

export function PortfolioPage() {
    return (
        <motion.div
            key="material-portfolio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full"
        >
            <div className="h-full overflow-y-auto bg-background">
                <Header />
                <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                   <div className="space-y-12">
                        <AboutSection />
                        <SkillsSection />
                        <ProjectsSection />
                    </div>
                </main>
            </div>
        </motion.div>
    );
}
