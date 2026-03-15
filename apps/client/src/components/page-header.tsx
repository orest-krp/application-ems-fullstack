interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 text-center sm:text-start">
      <h1 className="text-3xl font-bold">{title}</h1>

      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
