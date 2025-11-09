interface Stat {
    label: string;
    value: number | string;
}

interface StatsBarProps {
    stats: Stat[];
}

export default function StatsBar({ stats }: StatsBarProps) {
    return (
        <div className="flex flex-wrap gap-6 md:gap-8">
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                    <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{stat.value}</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</span>
                </div>
            ))}
        </div>
    );
}
