
import { aboutText } from '@/lib/information';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutSection() {
    return (
        <section id="about" className="py-12">
            <Card>
                <CardHeader>
                    <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                        {aboutText}
                    </p>
                </CardContent>
            </Card>
        </section>
    );
}
