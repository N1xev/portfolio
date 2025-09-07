import { Cpu } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { skills } from '@/lib/information';

export function SkillsOutput() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Cpu className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">Skills</h2>
      </div>
      <div className="mt-4 space-y-6">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category}>
            <h3 className="font-semibold mb-3 text-primary/90">{category}</h3>
            <div className="space-y-3 pl-2 text-muted-foreground">
              {skillList.map((skill) => (
                <div
                  key={skill.name}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
                >
                  <span className="col-span-1">{skill.name}</span>
                  <div className="col-span-2">
                    <Progress value={skill.level} className="h-2 bg-accent" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
