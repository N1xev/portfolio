
import { aboutText } from '@/lib/information';

export function AboutSection() {
    return (
        <section id="about">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                About Me
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
                {aboutText}
            </p>
        </section>
    );
}
