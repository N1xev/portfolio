import { FolderGit2 } from 'lucide-react';
import { TypingEffect } from '@/components/typing-effect';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { useEffect } from 'react';

interface ProjectsOutputProps {
    onComplete?: () => void;
}

const projects = [
  {
    title: 'Distributed Key-Value Store',
    description:
      'A high-performance, distributed key-value store built in Golang, implementing the Raft consensus algorithm for fault tolerance. Features consistent hashing for data distribution and gRPC for inter-node communication.',
    tech: ['Golang', 'gRPC', 'Protocol Buffers', 'Raft Consensus'],
  },
  {
    title: 'Real-time Collaborative Code Editor',
    description:
      'A web-based code editor that allows multiple users to edit the same file in real-time. Built with Next.js on the frontend and a Node.js server using WebSockets for synchronization.',
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'WebSockets'],
  },
  {
    title: 'C++ Game Engine Physics Module',
    description:
      'Developed a custom 2D physics engine module in C++. Implemented collision detection (AABB, Circle), resolution, and rigid body dynamics from scratch to optimize performance for a tile-based game.',
    tech: ['C++', 'Clang', 'CMake', 'SDL2'],
  },
];

export function ProjectsOutput({ onComplete }: ProjectsOutputProps) {
    const [typedDescriptions, setTypedDescriptions] = React.useState<Record<string, boolean>>({});

    const allDescriptionsTyped = projects.every((_, i) => typedDescriptions[`item-${i}`]);

    useEffect(() => {
        if (allDescriptionsTyped) {
            onComplete?.();
        }
    }, [allDescriptionsTyped, onComplete]);


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
              {typedDescriptions[`item-${i}`] ? (
                p.description
              ) : (
                <TypingEffect
                    text={p.description}
                    speed={5}
                    onComplete={() => {
                        setTypedDescriptions(prev => ({...prev, [`item-${i}`]: true}));
                    }}
                />
              )}
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
