import { TypingEffect } from '@/components/typing-effect';

interface WelcomeOutputProps {
  onComplete?: () => void;
}

export function WelcomeOutput({ onComplete }: WelcomeOutputProps) {
  const welcomeText = `Welcome to Code Terminal Portfolio.
Initializing...
System ready.

Type 'help' to see available commands.`;
  return <TypingEffect text={welcomeText} speed={20} onComplete={onComplete} />;
}
