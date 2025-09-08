
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface HeaderProps {
    onSwitch?: () => void;
}

export function Header({ onSwitch }: HeaderProps) {
    useEffect(() => {
        const root = window.document.documentElement;
        if (!root.classList.contains('material-dark') && !root.classList.contains('material-light')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('material-dark', prefersDark);
            root.classList.toggle('material-light', !prefersDark);
        }

        return () => {
            root.classList.remove('material-dark', 'material-light');
        }
    }, [])


    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <a className="mr-6 flex items-center space-x-2" href="/">
                        <span className="hidden font-bold sm:inline-block">/samouly</span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={onSwitch} aria-label="Switch to Terminal">
                            <Terminal className="h-5 w-5" />
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
