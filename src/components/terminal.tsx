
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WelcomeOutput } from './outputs/welcome';
import { AboutOutput } from './outputs/about';
import { HelpOutput } from './outputs/help';
import { ProjectsOutput } from './outputs/projects';
import { SkillsOutput } from './outputs/skills';
import { NotFoundOutput } from './outputs/not-found';
import { motion, AnimatePresence } from 'framer-motion';
import { SitchOutput } from './outputs/sitch';
import { commands } from '@/lib/information';

const allCommands = commands.map(c => c.cmd);

interface TerminalProps {
    onSwitch?: () => void;
}

export function Terminal({ onSwitch }: TerminalProps) {
  const [history, setHistory] = useState<React.ReactNode[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [historySuggestion, setHistorySuggestion] = useState('');
  const originalInputValueRef = useRef('');

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onCommandComplete = useCallback(() => {
    setIsProcessing(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const setTheme = (theme: 'dark' | 'light') => {
      const root = window.document.documentElement;
      root.classList.toggle('dark', theme === 'dark');
      root.classList.toggle('material-dark', theme === 'dark');
      root.classList.toggle('material-light', theme === 'light');
  }

  const processCommand = useCallback(
    (command: string) => {
      const [cmd, ...args] = command.split(' ');
      const newHistory = [...history, <div className="mt-4" key={history.length}><span className="text-primary">&gt;</span> {command}</div>];
      setCommandHistory(prev => (prev.length > 0 && prev[prev.length - 1] === command ? prev : [...prev, command]));

      let output: React.ReactNode;
      switch (cmd.toLowerCase().trim()) {
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
          output = <ProjectsOutput />;
          break;
        case 'clear':
          setHistory([]);
          onCommandComplete();
          return;
        case 'sitch':
          output = <SitchOutput />;
          break;
        case 'switch':
            onSwitch?.();
            output = 'Switching to Materil portfolio view...'
            break;
        case 'theme':
            const flag = args[0];
            if (flag === '--dark') {
                setTheme('dark');
                output = 'Theme set to dark.';
            } else if (flag === '--light') {
                setTheme('light');
                output = 'Theme set to light.';
            } else {
                output = 'Usage: theme [--dark|--light]';
            }
            break;
        default:
          output = <NotFoundOutput command={command} />;
      }
      
      const newOutput = <div className="mt-2" key={history.length + 1}>{output}</div>
      setHistory([...newHistory, newOutput]);

      const isImmediate = !['about'].includes(command.toLowerCase().trim());
      
      if (isImmediate) {
         onCommandComplete();
      }
    },
    [history, onCommandComplete, onSwitch]
  );
  
  useEffect(() => {
    setHistory([<WelcomeOutput key="welcome" />]);
    setTheme('dark');
    onCommandComplete();
  }, [onCommandComplete]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputValue) {
      const historyMatch = [...commandHistory].reverse().find(cmd => cmd.startsWith(inputValue) && cmd !== inputValue);
      setHistorySuggestion(historyMatch || '');

      const commandMatches = allCommands.filter(cmd => cmd.startsWith(inputValue));
      setSuggestions(commandMatches);
      setSuggestionIndex(0);
    } else {
      setHistorySuggestion('');
      setSuggestions([]);
    }
  }, [inputValue, commandHistory]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    originalInputValueRef.current = value;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isProcessing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      const command = inputValue.trim();
      if (command) {
        setIsProcessing(true);
        setInputValue('');
        setHistorySuggestion('');
        setSuggestions([]);
        setHistoryPointer(commandHistory.length);
        processCommand(command);
        originalInputValueRef.current = ''; 
      }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        if (suggestions.length > 0) {
            const isShift = e.shiftKey;
            let nextIndex;
            if (isShift) {
                nextIndex = suggestionIndex === 0 ? suggestions.length - 1 : suggestionIndex - 1;
            } else {
                nextIndex = (suggestionIndex + 1) % suggestions.length;
            }
            setSuggestionIndex(nextIndex);
            const newInputValue = suggestions[nextIndex];
            setInputValue(newInputValue);
            originalInputValueRef.current = newInputValue;
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newPointer = Math.max(-1, historyPointer - 1);
        if (newPointer >= 0 && newPointer < commandHistory.length) {
            const cmd = commandHistory[commandHistory.length - 1 - newPointer];
            setInputValue(cmd);
            originalInputValueRef.current = cmd;
        }
        setHistoryPointer(newPointer);
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const newPointer = Math.min(commandHistory.length, historyPointer + 1);
        if (newPointer < commandHistory.length) {
            const cmd = commandHistory[commandHistory.length - 1 - newPointer];
            setInputValue(cmd);
            originalInputValueRef.current = cmd;
        } else {
            setInputValue(originalInputValueRef.current);
        }
        setHistoryPointer(newPointer);
    } else if (e.key === 'ArrowRight' || (e.ctrlKey && e.key === 'f')) {
        if (historySuggestion && inputRef.current?.selectionStart === inputValue.length) {
            e.preventDefault();
            setInputValue(historySuggestion);
            originalInputValueRef.current = historySuggestion;
        }
    } else {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          setHistoryPointer(commandHistory.length);
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="w-full h-full max-w-5xl mx-auto bg-card border border-border rounded-xl p-4 overflow-hidden flex flex-col font-mono shadow-2xl shadow-primary/10"
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
            <div className="relative flex items-center">
              <span className="text-primary">&gt;</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent text-foreground focus:outline-none w-full pl-2 z-10 relative"
                  autoFocus
                  disabled={isProcessing}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                />
                {historySuggestion && inputValue && (
                  <div className="absolute inset-y-0 left-0 pl-2 text-muted-foreground/50 pointer-events-none z-0">
                    <span className="invisible">{inputValue}</span>
                    <span>{historySuggestion.substring(inputValue.length)}</span>
                  </div>
                )}
              </div>
            </div>
        )}
      </motion.div>
    </div>
  );
}
