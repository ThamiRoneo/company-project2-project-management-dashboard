import StatCard from "../ui/StatCard";

interface StatItem {
  title: string;
  value: number;
  icon: string;
  color: string;
}

interface StatGridProps {
  stats: StatItem[];
}

export default function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((s) => (
        <StatCard key={s.title} {...s} />
      ))}
    </div>
  );
}
