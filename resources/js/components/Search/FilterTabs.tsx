import { router } from '@inertiajs/react';

interface FilterTabsProps {
    currentType: string;
    query: string;
}

export function FilterTabs({ currentType, query }: FilterTabsProps) {
    const tabs = [
        { label: 'All', value: 'all' },
        { label: 'Artists', value: 'artists' },
        { label: 'Curators', value: 'curators' },
        { label: 'Galleries', value: 'galleries' },
    ];

    const handleTabClick = (value: string) => {
        router.visit(`/search?q=${encodeURIComponent(query)}&type=${value}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex gap-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => handleTabClick(tab.value)}
                        className={`relative whitespace-nowrap px-1 py-3 text-sm font-medium transition-colors ${
                            currentType === tab.value
                                ? 'text-zinc-900 dark:text-zinc-50'
                                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                        }`}
                    >
                        {tab.label}
                        {currentType === tab.value && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-zinc-50" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
