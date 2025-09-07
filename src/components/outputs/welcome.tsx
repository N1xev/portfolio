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
  return <TypingEffect text={welcomeText} speed={10} onComplete={onComplete} />;
}
