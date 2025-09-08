
import { Terminal, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface HeaderProps {
    onSwitch?: () => void;
}

export function Header({ onSwitch }: HeaderProps) {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const root = window.document.documentElement;
        const isCurrentlyDark = root.classList.contains('material-dark');
        setIsDark(isCurrentlyDark);
    }, [])

    const toggleTheme = () => {
        const root = window.document.documentElement;
        root.classList.toggle('material-dark', !isDark);
        root.classList.toggle('material-light', isDark);
        setIsDark(!isDark);
    }

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
                        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle Theme">
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onSwitch} aria-label="Switch to Terminal">
                            <Terminal className="h-5 w-5" />
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
