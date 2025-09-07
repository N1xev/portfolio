import { TypingEffect } from '@/components/typing-effect';

interface WelcomeOutputProps {
  onComplete?: () => void;
}

export function WelcomeOutput({ onComplete }: WelcomeOutputProps) {
  const welcomeText = `
   SSSSSSSSSSSSSSS                  lllllll
 SS:::::::::::::::S              l:::::l
S:::::SSSSSS::::::S              l:::::l
S:::::S     SSSSSSS              l:::::l
S:::::S            aaaaaaaaaaaaa  l::::l uuuuuu    uuuuuu lllllll yyyyyyy           yyyyyyy
S:::::S            a::::::::::::a l::::l u::::u    u::::u l:::::l  y:::::y         y:::::y 
 S::::SSSS         aaaaaaaaa:::::al::::l u::::u    u::::u l:::::l   y:::::y       y:::::y  
  SS::::::SSSSS             a::::al::::l u::::u    u::::u l:::::l    y:::::y     y:::::y   
    SSS::::::::SS    aaaaaaa:::::al::::l u::::u    u::::u l:::::l     y:::::y   y:::::y    
       SSSSSS::::S aa::::::::::::al::::l u::::u    u::::u l:::::l      y:::::y y:::::y     
            S:::::Sa::::aaaa::::::al::::l u::::u    u::::u l:::::l       y:::::y:::::y      
            S:::::Sa::::a    a::::al::::l u:::::uuuuu:::::u l:::::l        y:::::::::y       
SSSSSSS     S:::::Sa::::a    a::::al::::l u:::::::::::::::u l:::::l         y:::::::y        
S::::::SSSSSS:::::Sa:::::aaaa::::::al::::::l u:::::::::::::::u l::::::l        y:::::y         
S:::::::::::::::SS a::::::::::aa:::al::::::l  uu::::::::uu:uu l::::::l       y:::::y          
 SSSSSSSSSSSSSSS    aaaaaaaaaa  aaaallllllll    uuuuuuuu  uu lllllll      y:::::y           
                                                                        y:::::y            
                                                                       y:::::y             
                                                                      y:::::y              
                                                                     y:::::y               
                                                                    yyyyyyy                

Welcome, user. Type 'help' to see available commands.`;

  const typingSpeed = 500 / welcomeText.length;

  return (
    <TypingEffect text={welcomeText} speed={typingSpeed} onComplete={onComplete} />
  );
}
