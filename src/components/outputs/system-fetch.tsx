
'use client';

import { useEffect, useState } from 'react';

const Logo = () => (
    <pre className="font-code text-primary">
{`
   __   __   __   __  
  /  \\ /  \\ /  \\ /  \\ 
 /|__/ /|__/ /|__/ /|__/ 
 ||__  ||__  ||__  ||__  
 \\| /  \\| /  \\| /  \\| /  
  \\/    \\/    \\/    \\/   
                        
`}
    </pre>
);

const UserInfo = ({label, value}: {label: string, value: string}) => (
    <div>
        <span className="text-primary font-bold">{label}</span>
        : {value}
    </div>
);


export function SystemFetch() {
    const [os, setOs] = useState('...');
    const [shell, setShell] = useState('...');

    useEffect(() => {
        const getOS = () => {
            if (typeof window !== "undefined") {
                const userAgent = window.navigator.userAgent;
                if (userAgent.indexOf("Win") !== -1) return "Windows";
                if (userAgent.indexOf("Mac") !== -1) return "MacOS";
                if (userAgent.indexOf("Linux") !== -1) return "Linux";
            }
            return "Unknown";
        };
        setOs(getOS());

        const getShell = () => {
             if (typeof window !== "undefined") {
                const userAgent = window.navigator.userAgent;
                if (userAgent.indexOf("Win") !== -1) return "powershell";
                if (userAgent.indexOf("Mac") !== -1) return "zsh";
                if (userAgent.indexOf("Linux") !== -1) return "bash";
            }
            return "sh";
        }
        setShell(getShell());

    }, []);

    const colorBlocks = "■ ■ ■ ■ ■ ■ ■ ■";

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="text-sm">
                <Logo />
            </div>
            <div className="flex-1">
                <UserInfo label="user" value="samouly@portfolio" />
                <div className="my-2 border-b border-dashed border-muted-foreground w-28"></div>
                <UserInfo label="os" value={os} />
                <UserInfo label="shell" value={shell} />
                <UserInfo label="uptime" value="13d 3h 17m" />
                <UserInfo label="version" value="2.0.1" />
                <div className="mt-4 flex gap-2">
                    <span style={{ color: '#000000' }}>{colorBlocks}</span>
                </div>
                 <div className="flex gap-2">
                    <span style={{ color: '#FFFFFF' }}>{colorBlocks}</span>
                </div>
            </div>
        </div>
    );
}
