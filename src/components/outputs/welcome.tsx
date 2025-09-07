import { useEffect } from 'react';
import { welcomeText } from '@/lib/information';

interface WelcomeOutputProps {
  onComplete?: () => void;
}

export function WelcomeOutput({ onComplete }: WelcomeOutputProps) {
  useEffect(() => {
    onComplete?.();
  }, [onComplete]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: welcomeText }}
    />
  );
}
