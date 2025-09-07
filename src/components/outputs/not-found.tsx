export function NotFoundOutput({ command }: { command: string }) {
  return (
    <div>
      <span className="text-destructive">command not found: {command}</span>
      <p className="text-muted-foreground">Type 'help' for a list of available commands.</p>
    </div>
  );
}
