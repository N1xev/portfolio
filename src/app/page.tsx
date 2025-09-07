
'use client';

import { Terminal } from '@/components/terminal';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        setIsStarted(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { staggerChildren: 0.1, staggerDirection: -1 }
     }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };


  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="start-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={itemVariants} className="rounded-lg border bg-card text-card-foreground shadow-sm w-80">
                <div className="p-6 flex flex-col items-center gap-4">
                    <h3 className="text-xl font-semibold leading-none tracking-tight">Start Portfolio</h3>
                    <p className="text-sm text-muted-foreground">Click the button to begin</p>
                    <Button onClick={() => setIsStarted(true)} className="w-full" size="lg">
                        Initialize
                    </Button>
                </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-lg border bg-card text-card-foreground shadow-sm w-80">
                 <div className="p-6 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        Or press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>Enter
                        </kbd> / <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">Ctrl</span>Enter
                        </kbd>
                    </p>
                 </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full flex items-center justify-center"
          >
            <Terminal />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
