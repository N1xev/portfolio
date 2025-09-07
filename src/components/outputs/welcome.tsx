import { useEffect } from 'react';
import { TypingEffect } from '@/components/typing-effect';
import { welcomeText } from '@/lib/information';

interface WelcomeOutputProps {
  onComplete?: () => void;
}

export function WelcomeOutput({ onComplete }: WelcomeOutputProps) {
  const typingSpeed = welcomeText.length / 0.5;

  return (
    <div style={{ fontFamily: "'Geist Mono Nerd Font', 'Geist Mono', monospace" }}>
        <TypingEffect text={welcomeText} speed={1000/typingSpeed} onComplete={onComplete} />
    </div>
  )
}
