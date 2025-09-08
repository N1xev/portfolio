
import { skills } from '@/lib/information';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SkillsSection() {
    return (
        <section id="skills" className="py-12">
            <Card>
                <CardHeader>
                    <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {Object.entries(skills).map(([category, skillList]) => (
                            <div key={category}>
                                <h3 className="text-xl font-semibold mb-4 text-primary">{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skillList.map((skill) => (
                                        <Badge key={skill.name} variant="secondary" className="text-sm">
                                            {skill.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
