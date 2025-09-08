
import { projects } from '@/lib/information';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ProjectsSection() {
    return (
        <section id="projects">
             <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-8">
                My Projects
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground text-sm">{project.description}</p>
                        </CardContent>
                        <CardFooter className="flex flex-wrap gap-2 pt-4">
                            {project.tech.map((tech, i) => (
                                <Badge key={i} variant="outline">{tech}</Badge>
                            ))}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
