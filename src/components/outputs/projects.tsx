import { FolderGit2 } from 'lucide-react';
import { TypingEffect } from '@/components/typing-effect';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { useEffect } from 'react';
import { projects } from '@/lib/information';

interface ProjectsOutputProps {
    onComplete?: () => void;
}

export function ProjectsOutput({ onComplete }: ProjectsOutputProps) {
    useEffect(() => {
        onComplete?.();
    }, [onComplete]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <FolderGit2 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">Projects</h2>
      </div>
      <Accordion type="single" collapsible className="w-full mt-2">
        {projects.map((p, i) => (
          <AccordionItem value={`item-${i}`} key={i}>
            <AccordionTrigger>{p.title}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <TypingEffect
                  text={p.description}
                  speed={0.1}
              />
              <div className="mt-4">
                <span className="font-semibold text-primary/80">Tech:</span> {p.tech.join(', ')}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
       <p className="text-xs text-muted-foreground mt-2">Expand items to view details.</p>
    </div>
  );
}
