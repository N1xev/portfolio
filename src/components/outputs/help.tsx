const commands = [
  { cmd: 'about', desc: 'Display a short bio.' },
  { cmd: 'skills', desc: 'List my technical skills.' },
  { cmd: 'projects', desc: 'Showcase my recent projects.' },
  { cmd: 'clear', desc: 'Clear the terminal screen.' },
  { cmd: 'help', desc: 'Show this help message.' },
];

export function HelpOutput() {
  return (
    <div>
      <p className="mb-2 font-bold">Available commands:</p>
      <ul className="space-y-1">
        {commands.map(({ cmd, desc }) => (
          <li key={cmd} className="grid grid-cols-1 sm:grid-cols-4 gap-x-4">
            <span className="font-bold text-primary/90 col-span-1">{cmd}</span>
            <span className="text-muted-foreground col-span-3">{desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
