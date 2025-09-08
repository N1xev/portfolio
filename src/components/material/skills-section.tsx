
import { skills } from '@/lib/information';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SkillsSection() {
    return (
        <section id="skills">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-8">
                Skills
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
                {Object.entries(skills).map(([category, skillList]) => (
                    <Card key={category} className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary">{category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {skillList.map((skill) => (
                                    <Badge key={skill.name} variant="secondary" className="text-md font-medium">
                                        {skill.name}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
