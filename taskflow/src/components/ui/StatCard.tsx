interface StatCardProps {
    title: string;
    value: number;
    icon: string;
    color: string; // Tailwind bg class e.g. "bg-blue-500"
  }

  export default function StatCard({ title, value, icon, color }: StatCardProps) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
        <div className={`${color} text-white rounded-lg p-3 text-2xl`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    );
  }
