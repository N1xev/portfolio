import { User } from 'lucide-react';
import { TypingEffect } from '@/components/typing-effect';

interface AboutOutputProps {
    onComplete?: () => void;
}

export function AboutOutput({ onComplete }: AboutOutputProps) {
  const aboutText = `A passionate and versatile Fullstack Developer with a knack for building robust and scalable applications. My expertise spans across modern web technologies, with a deep interest in the performance and efficiency of backend systems using Golang and the power of low-level programming with C/C++.

I thrive in fast-paced environments and am always eager to learn new technologies and tackle challenging problems. My goal is to create software that is not only functional but also elegant and efficient.`;
  return (
    <div>
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">About Me</h2>
      </div>
      <div className="mt-2 text-muted-foreground">
        <TypingEffect text={aboutText} onComplete={onComplete} />
      </div>
    </div>
  );
}
