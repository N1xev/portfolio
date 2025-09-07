import { FolderGit2 } from 'lucide-react';
import { TypingEffect } from '@/components/typing-effect';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { projects } from '@/lib/information';

interface ProjectsOutputProps {
    onComplete?: () => void;
}

export function ProjectsOutput({ onComplete }: ProjectsOutputProps) {
    const [typedDescriptions, setTypedDescriptions] = useState<Record<string, boolean>>({});
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    const descriptionsToType = projects.length;
    
    useEffect(() => {
        const typedCount = Object.values(typedDescriptions).filter(Boolean).length;
        if (typedCount === descriptionsToType) {
            onCompleteRef.current?.();
        }
    }, [typedDescriptions, descriptionsToType]);

    const handleTypingComplete = useCallback((index: number) => {
        setTypedDescriptions(prev => ({...prev, [`item-${index}`]: true}));
    }, []);

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
                  speed={5}
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
