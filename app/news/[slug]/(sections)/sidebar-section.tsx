interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div>
      <h3 className="text-zinc-900 dark:text-zinc-100 text-lg font-bold mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}
