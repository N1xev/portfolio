import { User } from 'lucide-react';
import { TypingEffect } from '@/components/typing-effect';
import { aboutText } from '@/lib/information';

interface AboutOutputProps {
    onComplete?: () => void;
}

export function AboutOutput({ onComplete }: AboutOutputProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">About Me</h2>
      </div>
      <div className="mt-2 text-muted-foreground">
        <TypingEffect text={aboutText} speed={2} onComplete={onComplete} />
      </div>
    </div>
  );
}
