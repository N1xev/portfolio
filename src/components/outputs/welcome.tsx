import { TypingEffect } from '@/components/typing-effect';

interface WelcomeOutputProps {
  onComplete?: () => void;
}

export function WelcomeOutput({ onComplete }: WelcomeOutputProps) {
  const welcomeText = `
  ____          _        _______          _             
 / ___|        | |      |__   __|        | |            
| |       __ _| | _____   | | ___  _ __ | | _____ _ __ 
| |      / _\` | |/ / _ \\  | |/ _ \\| '_ \\| |/ / _ \\ '__|
| |____ | (_| |   <  __/  | | (_) | | | |   <  __/ |   
 \\_____|\\__,_|_|\\_\\___|  |_|\\___/|_| |_|_|\\_\\___|_|   
                                                     
                                                     
Booting virtual OS...
System check complete.
Welcome, user. Type 'help' to see a list of available commands.`;
  return <TypingEffect text={welcomeText} speed={10} onComplete={onComplete} />;
}
