
import { skills } from '@/lib/information';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function SkillsSection() {
    return (
        <section id="skills" className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center mb-12">
                     <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Skills</h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                           A snapshot of my technical abilities and expertise.
                        </p>
                    </div>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(skills).map(([category, skillList]) => (
                        <Card key={category} className="bg-card">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">{category}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {skillList.map((skill) => (
                                    <div key={skill.name} className="space-y-1">
                                         <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm text-foreground">{skill.name}</span>
                                            <span className="text-xs text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <Progress value={skill.level} className="h-2" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
