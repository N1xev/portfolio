
'use client';

import { Terminal as TerminalView } from '@/components/terminal';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PortfolioPage } from '@/components/material/portfolio-page';
import { Terminal, Notebook } from 'lucide-react';

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState<'terminal' | 'material'>('terminal');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isStarted) {
            setIsStarted(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isStarted]);
  
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

  const StartScreen = () => (
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
                <h3 className="text-xl font-semibold leading-none tracking-tight">Choose your experience</h3>
                <div className="flex gap-2 w-full">
                    <Button onClick={() => { setTheme('terminal'); setIsStarted(true); }} className="w-full" size="lg">
                        <Terminal className="mr-2" /> Terminal
                    </Button>
                    <Button onClick={() => { setTheme('material'); setIsStarted(true); }} className="w-full" size="lg" variant="secondary">
                        <Notebook className="mr-2" /> Portfolio
                    </Button>
                </div>
            </div>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-lg border bg-card text-card-foreground shadow-sm w-80">
                <div className="p-6 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Or press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>Enter
                    </kbd> / <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">Ctrl</span>Enter
                    </kbd> for terminal.
                </p>
                </div>
        </motion.div>
    </motion.div>
  )

  return (
    <main className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 fixed inset-0">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <StartScreen />
        ) : theme === 'terminal' ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full flex items-center justify-center"
          >
            <TerminalView />
          </motion.div>
        ) : (
          <PortfolioPage />
        )}
      </AnimatePresence>
    </main>
  );
}
