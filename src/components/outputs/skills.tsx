import { Cpu } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const skills = {
  'Web Development': [
    { name: 'React / Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js / Express', level: 85 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Firebase', level: 80 },
  ],
  Golang: [
    { name: 'Concurrent Programming', level: 90 },
    { name: 'Microservices & APIs', level: 80 },
    { name: 'gRPC & Protobuf', level: 85 },
    { name: 'Standard Library', level: 95 },
  ],
  'C & C++ (Clang)': [
    { name: 'Systems Programming', level: 75 },
    { name: 'Performance Optimization', level: 80 },
    { name: 'Memory Management', level: 85 },
    { name: 'Build Systems (CMake)', level: 70 },
  ],
};

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
