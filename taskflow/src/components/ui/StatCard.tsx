interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string; // Tailwind bg class e.g. "bg-primary"
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-5 flex items-center gap-4 transition-transform hover:-translate-y-0.5">
      <div className={`${color} text-text-inverse rounded-lg p-3 text-2xl leading-none`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-text mt-0.5">{value}</p>
      </div>
    </div>
  );
}
