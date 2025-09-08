
import { aboutText } from '@/lib/information';

function Section({ children }: { children: React.ReactNode }) {
    return (
        <section className="w-full max-w-5xl py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                {children}
            </div>
        </section>
    )
}

export function AboutSection() {
    return (
        <Section>
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">About Me</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {aboutText}
                    </p>
                </div>
            </div>
        </Section>
    );
}
