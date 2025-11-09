import ArtistCard from '@/components/Cards/ArtistCard';
import CuratorCard from '@/components/Cards/CuratorCard';
import GalleryCard from '@/components/Cards/GalleryCard';
import MainLayout from '@/components/Layout/MainLayout';
import { FilterTabs } from '@/components/Search/FilterTabs';
import { motion } from 'framer-motion';
import { Building2, Palette, Search, Sparkles } from 'lucide-react';

interface SearchResult {
    id: number;
    type: 'artist' | 'curator' | 'gallery';
    [key: string]: any;
}

interface SearchIndexProps {
    results: {
        artists: { data: SearchResult[] };
        curators: { data: SearchResult[] };
        galleries: { data: SearchResult[] };
    };
    query: string;
    type: string;
}

const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.05,
        },
    },
};

export default function Index({ results, query, type }: SearchIndexProps) {
    const allResults: SearchResult[] = [...(results.artists?.data || []), ...(results.curators?.data || []), ...(results.galleries?.data || [])];

    const totalCount = allResults.length;
    const hasNoResults = totalCount === 0 && query;

    const getTypeConfig = (resultType: string) => {
        const configs = {
            artist: {
                icon: Palette,
                label: 'Artist',
                color: 'text-purple-600 dark:text-purple-400',
                bg: 'bg-purple-50 dark:bg-purple-900/20',
            },
            curator: {
                icon: Sparkles,
                label: 'Curator',
                color: 'text-blue-600 dark:text-blue-400',
                bg: 'bg-blue-50 dark:bg-blue-900/20',
            },
            gallery: {
                icon: Building2,
                label: 'Gallery',
                color: 'text-orange-600 dark:text-orange-400',
                bg: 'bg-orange-50 dark:bg-orange-900/20',
            },
        };
        return configs[resultType as keyof typeof configs] || configs.artist;
    };

    return (
        <MainLayout title={query ? `Search results for "${query}"` : 'Search'}>
            <div className="min-h-screen bg-white dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Search Header */}
                    {query && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mb-6">
                            <h1 className="mb-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Search results for "{query}"</h1>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {totalCount} {totalCount === 1 ? 'result' : 'results'}
                            </p>
                        </motion.div>
                    )}

                    {/* Filter Tabs */}
                    {query && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.05 }} className="mb-6">
                            <FilterTabs currentType={type} query={query} />
                        </motion.div>
                    )}

                    {/* Results */}
                    <div className="pb-8">
                        {hasNoResults ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50/50 py-16 text-center dark:border-zinc-800 dark:bg-zinc-900/30"
                            >
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                                    <Search className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
                                </div>
                                <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">No results found</h2>
                                <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">Try different keywords or check your spelling.</p>
                            </motion.div>
                        ) : !query ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50/50 py-16 text-center dark:border-zinc-800 dark:bg-zinc-900/30"
                            >
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                                    <Search className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Start Exploring</h2>
                                <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
                                    Use the search bar above to discover artists, curators, and galleries
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial="initial"
                                animate="animate"
                                variants={staggerContainer}
                                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {allResults.map((result) => {
                                    const typeConfig = getTypeConfig(result.type);
                                    const Icon = typeConfig.icon;

                                    return (
                                        <motion.div key={`${result.type}-${result.id}`} variants={fadeInUp} className="relative">
                                            <div className="absolute -top-2 -right-2 z-10">
                                                <div
                                                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${typeConfig.bg} ${typeConfig.color}`}
                                                >
                                                    <Icon className="h-3 w-3" />
                                                    {typeConfig.label}
                                                </div>
                                            </div>
                                            {result.type === 'artist' && <ArtistCard artist={result as any} />}
                                            {result.type === 'curator' && <CuratorCard curator={result as any} />}
                                            {result.type === 'gallery' && <GalleryCard gallery={result as any} />}
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
