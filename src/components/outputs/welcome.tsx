import { TypingEffect } from '@/components/typing-effect';

interface WelcomeOutputProps {
  onComplete?: () => void;
}

export function WelcomeOutput({ onComplete }: WelcomeOutputProps) {
  const welcomeText = `
  ███████╗ █████╗ ███╗   ███╗ ██████╗ ██╗   ██╗██╗     ██╗   ██╗
  ██╔════╝██╔══██╗████╗ ████║██╔═══██╗██║   ██║██║     ╚██╗ ██╔╝
  ███████╗███████║██╔████╔██║██║   ██║██║   ██║██║      ╚████╔╝ 
  ╚════██║██╔══██║██║╚██╔╝██║██║   ██║██║   ██║██║       ╚██╔╝  
  ███████║██║  ██║██║ ╚═╝ ██║╚██████╔╝╚██████╔╝███████╗   ██║   
  ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝   ╚═╝   
                                                              
Welcome, user. Type 'help' to see available commands.`;

  const typingSpeed = 500 / welcomeText.length;

  return (
    <TypingEffect text={welcomeText} speed={typingSpeed} onComplete={onComplete} />
  );
}
