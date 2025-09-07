
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getCommandSuggestions } from '@/lib/actions';
import { WelcomeOutput } from './outputs/welcome';
import { AboutOutput } from './outputs/about';
import { HelpOutput } from './outputs/help';
import { ProjectsOutput } from './outputs/projects';
import { SkillsOutput } from './outputs/skills';
import { NotFoundOutput } from './outputs/not-found';
import { motion, AnimatePresence } from 'framer-motion';

export function Terminal() {
  const [history, setHistory] = useState<React.ReactNode[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onCommandComplete = useCallback(() => {
    setIsProcessing(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const processCommand = useCallback(
    (command: string) => {
      const newHistory = [...history, <div key={history.length}><span className="text-primary">&gt;</span> {command}</div>];
      setCommandHistory(prev => (prev.at(-1) === command ? prev : [...prev, command]));

      let output: React.ReactNode;
      switch (command.toLowerCase().trim()) {
        case 'help':
          output = <HelpOutput />;
          break;
        case 'about':
          output = <AboutOutput onComplete={onCommandComplete} />;
          break;
        case 'skills':
          output = <SkillsOutput />;
          break;
        case 'projects':
          output = <ProjectsOutput onComplete={onCommandComplete} />;
          break;
        case 'clear':
          setHistory([]);
          onCommandComplete();
          return;
        default:
          output = <NotFoundOutput command={command} />;
      }
      
      setHistory([...newHistory, <div key={history.length + 1}>{output}</div>]);

      if (['skills', 'help', 'clear'].includes(command.toLowerCase().trim()) || command.toLowerCase().startsWith('not-found')) {
         onCommandComplete();
      } else if (command.toLowerCase().trim() !== 'projects' && command.toLowerCase().trim() !== 'about'){
        onCommandComplete();
      }
    },
    [history, onCommandComplete]
  );
  
  useEffect(() => {
    setHistory([<WelcomeOutput key="welcome" onComplete={() => {
        setIsProcessing(false);
        inputRef.current?.focus();
    }} />]);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputValue === '' || isProcessing) {
      setSuggestions([]);
      return;
    }
    const handler = setTimeout(async () => {
      const navHistory = commandHistory.slice(-5);
      const newSuggestions = await getCommandSuggestions(inputValue, navHistory);
      setSuggestions(newSuggestions);
    }, 150);
    return () => clearTimeout(handler);
  }, [inputValue, commandHistory, isProcessing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isProcessing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      const command = inputValue.trim();
      if (command) {
        setIsProcessing(true);
        setInputValue('');
        setSuggestions([]);
        setHistoryPointer(commandHistory.length);
        processCommand(command);
      }
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setInputValue(suggestions[0]);
      setSuggestions([]);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newPointer = Math.max(-1, historyPointer - 1);
        if (newPointer >= 0 && newPointer < commandHistory.length) {
            setInputValue(commandHistory[commandHistory.length - 1 - newPointer]);
        }
        setHistoryPointer(newPointer);
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const newPointer = Math.min(commandHistory.length, historyPointer + 1);
        if (newPointer < commandHistory.length) {
            setInputValue(commandHistory[commandHistory.length - 1 - newPointer]);
        } else {
            setInputValue('');
        }
        setHistoryPointer(newPointer);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="w-full h-[85vh] max-w-5xl bg-card border border-border rounded-xl p-4 overflow-hidden flex flex-col font-code shadow-2xl shadow-primary/10"
      onClick={focusInput}
    >
      <div ref={containerRef} className="flex-grow overflow-y-auto pr-2">
        <AnimatePresence initial={false}>
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-2 last:mb-0"
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-2"
      >
        {isProcessing ? null : (
          <>
            {suggestions.length > 0 && !isProcessing && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <span>Suggestions:</span>
                {suggestions.map((s, i) => (
                  <span key={i} className="bg-accent px-2 py-0.5 rounded-sm">
                    {s}
                  </span>
                ))}
                <span className="text-xs">(Press Tab to autocomplete)</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="text-primary">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-foreground focus:outline-none flex-1 pl-2"
                autoFocus
                disabled={isProcessing}
              />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
