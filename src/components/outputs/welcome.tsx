import { useEffect, useState } from 'react';
import { welcomeText, welcomeTextMobile } from '@/lib/information';
import { useIsMobile } from '@/hooks/use-mobile';

interface WelcomeOutputProps {
  onComplete?: () => void;
}

export function WelcomeOutput({ onComplete }: WelcomeOutputProps) {
  const isMobile = useIsMobile();
  const [text, setText] = useState(isMobile ? welcomeTextMobile : welcomeText);

  useEffect(() => {
    setText(isMobile ? welcomeTextMobile : welcomeText);
  }, [isMobile]);

  useEffect(() => {
    onComplete?.();
  }, [onComplete]);

  return (
    <div
      className="font-code leading-[18px]"
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {text}
    </div>
  );
}
