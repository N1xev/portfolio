
import { Sun, Moon, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface HeaderProps {
    onSwitch?: () => void;
}

export function Header({ onSwitch }: HeaderProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        // Set default theme based on system preference or saved theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultIsDark = root.classList.contains('dark') || prefersDark;

        root.classList.toggle('dark', defaultIsDark);
        root.classList.toggle('material-dark', defaultIsDark);
        root.classList.toggle('material-light', !defaultIsDark);
        setIsDark(defaultIsDark);

        return () => {
            root.classList.remove('material-dark', 'material-light');
        }
    }, [])

    const toggleTheme = () => {
        const root = window.document.documentElement;
        root.classList.toggle('dark');
        root.classList.toggle('material-dark');
        root.classList.toggle('material-light');
        setIsDark(!isDark);
    };

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
                        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
