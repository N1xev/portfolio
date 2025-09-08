
'use client';

import { useEffect } from 'react';
import { SystemFetch } from '@/components/outputs/system-fetch';

interface WelcomeOutputProps {
  onComplete?: () => void;
}

export function WelcomeOutput({ onComplete }: WelcomeOutputProps) {

  useEffect(() => {
    onComplete?.();
  }, [onComplete]);

  return (
    <div>
      <SystemFetch />
      <div className="mt-4">Welcome, user. Type 'help' to see available commands.</div>
    </div>
  );
}
