
import { projects } from '@/lib/information';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function Section({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <section className={`w-full max-w-5xl py-12 md:py-24 lg:py-32 ${className}`}>
            <div className="container px-4 md:px-6">
                {children}
            </div>
        </section>
    )
}

export function ProjectsSection() {
    return (
        <Section className="bg-secondary">
             <div className="flex flex-col items-center space-y-4 text-center mb-12">
                 <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">My Projects</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Here are some of the projects I'm proud to have worked on.
                    </p>
                </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <Card key={index} className="flex flex-col bg-card">
                        <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground text-sm">{project.description}</p>
                        </CardContent>
                        <CardFooter className="flex flex-wrap gap-2 pt-4">
                            {project.tech.map((tech, i) => (
                                <Badge key={i} variant="secondary">{tech}</Badge>
                            ))}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
