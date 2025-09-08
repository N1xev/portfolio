
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function Header() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        const initialClass = root.classList.contains('dark') ? 'material-dark' : 'material-light';
        root.classList.add(initialClass);
        setIsDark(root.classList.contains('dark'));

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
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
