
'use client';

import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { welcomeTextDesktop, welcomeTextMobile } from '@/lib/information';

interface WelcomeOutputProps {
  onComplete?: () => void;
}

export function WelcomeOutput({ onComplete }: WelcomeOutputProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    onComplete?.();
  }, [onComplete]);

  const welcomeText = isMobile ? welcomeTextMobile : welcomeTextDesktop;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: welcomeText }}
    />
  );
}
