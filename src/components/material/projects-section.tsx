
import { projects } from '@/lib/information';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ProjectsSection() {
    return (
        <section id="projects" className="py-12">
             <Card className="border-0 shadow-none">
                <CardHeader>
                    <CardTitle>My Projects</CardTitle>
                    <CardDescription>A selection of my recent work.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">{project.description}</p>
                            </CardContent>
                            <CardFooter className="flex flex-wrap gap-2">
                                {project.tech.map((tech, i) => (
                                    <Badge key={i} variant="outline">{tech}</Badge>
                                ))}
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </section>
    );
}
