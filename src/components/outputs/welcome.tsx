import { TypingEffect } from '@/components/typing-effect';

interface WelcomeOutputProps {
  onComplete?: () => void;
}

export function WelcomeOutput({ onComplete }: WelcomeOutputProps) {
  const welcomeText = `
  █ █ █ █▀▀ █▀▄ █▀▀   █▀▀ █▀█ █▀▄ █▀▀ █ █ █▀█ ▄▀█ █▀▄
  ▀ █ █ ██▄ █▀▄ ██▄   █▄▄ █▀▄ █▄▀ █▄▄ █▄█ █▀▀ █▀█ █▄▀
                                                     
Initializing...
System ready.

Welcome, user. Type 'help' to see a list of available commands.`;
  return <TypingEffect text={welcomeText} speed={10} onComplete={onComplete} />;
}
