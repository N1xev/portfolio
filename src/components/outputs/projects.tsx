import { FolderGit2 } from 'lucide-react';
import { TypingEffect } from '@/components/typing-effect';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { useEffect, useRef, useCallback } from 'react';
import { projects } from '@/lib/information';

interface ProjectsOutputProps {
    onComplete?: () => void;
}

export function ProjectsOutput({ onComplete }: ProjectsOutputProps) {
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    const completedCountRef = useRef(0);
    const typedRef = useRef<Set<number>>(new Set());
    const descriptionsToType = projects.length;
    
    const handleTypingComplete = useCallback((index: number) => {
      if (!typedRef.current.has(index)) {
        typedRef.current.add(index);
        completedCountRef.current += 1;

        if (completedCountRef.current === descriptionsToType) {
          onCompleteRef.current?.();
        }
      }
    }, [descriptionsToType]);

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
                  speed={1}
                  onComplete={() => handleTypingComplete(i)}
              />
              <div className="mt-4">
                <span className="font-semibold text-primary/80">Tech:</span> {p.tech.join(', ')}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
       <p className="text-xs text-muted-foreground mt-2">Expand items to view details. The terminal will be ready for the next command once all project descriptions have been typed out.</p>
    </div>
  );
}
