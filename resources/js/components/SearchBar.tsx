import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface SearchResult {
    id: number;
    type: 'artist' | 'curator' | 'gallery';
    name: string;
    avatar?: string;
    subtitle: string;
    location: string;
    followers_count: number;
}

interface SearchResults {
    artists: SearchResult[];
    curators: SearchResult[];
    galleries: SearchResult[];
}

export function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResults | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (query.trim().length === 0) {
            setResults(null);
            setIsOpen(false);
            return;
        }

        setIsLoading(true);

        debounceRef.current = setTimeout(async () => {
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data);
                setIsOpen(true);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query]);

    const handleClear = () => {
        setQuery('');
        setResults(null);
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.visit(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    const handleResultClick = (result: SearchResult) => {
        const path =
            result.type === 'artist' ? `/artists/${result.id}` : result.type === 'curator' ? `/curators/${result.id}` : `/galleries/${result.id}`;

        router.visit(path);
        setIsOpen(false);
        setQuery('');
    };

    const totalResults = results ? results.artists.length + results.curators.length + results.galleries.length : 0;

    const getTypeBadge = (type: string) => {
        const badges = {
            artist: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
            curator: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            gallery: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
        };
        return badges[type as keyof typeof badges] || badges.artist;
    };

    return (
        <div ref={searchRef} className="relative m-auto w-1/2 max-w-2xl">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search artists, curators, galleries..."
                        className="m-auto w-full rounded-lg border border-zinc-200 bg-white py-2 pr-10 pl-10 text-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-purple-400"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </form>

            {isOpen && results && totalResults > 0 && (
                <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                    {isLoading ? (
                        <div className="p-4 text-center text-sm text-zinc-500">Loading...</div>
                    ) : (
                        <>
                            <div className="p-2">
                                {results.artists.length > 0 && (
                                    <div className="mb-2">
                                        {results.artists.map((result) => (
                                            <button
                                                key={`artist-${result.id}`}
                                                onClick={() => handleResultClick(result)}
                                                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            >
                                                <img
                                                    src={
                                                        result.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(result.name)}&size=40`
                                                    }
                                                    alt={result.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="truncate font-medium text-zinc-900 dark:text-white">{result.name}</p>
                                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getTypeBadge(result.type)}`}>
                                                            Artist
                                                        </span>
                                                    </div>
                                                    <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{result.subtitle}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {results.curators.length > 0 && (
                                    <div className="mb-2">
                                        {results.curators.map((result) => (
                                            <button
                                                key={`curator-${result.id}`}
                                                onClick={() => handleResultClick(result)}
                                                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            >
                                                <img
                                                    src={
                                                        result.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(result.name)}&size=40`
                                                    }
                                                    alt={result.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="truncate font-medium text-zinc-900 dark:text-white">{result.name}</p>
                                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getTypeBadge(result.type)}`}>
                                                            Curator
                                                        </span>
                                                    </div>
                                                    <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{result.subtitle}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {results.galleries.length > 0 && (
                                    <div className="mb-2">
                                        {results.galleries.map((result) => (
                                            <button
                                                key={`gallery-${result.id}`}
                                                onClick={() => handleResultClick(result)}
                                                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            >
                                                <img
                                                    src={
                                                        result.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(result.name)}&size=40`
                                                    }
                                                    alt={result.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="truncate font-medium text-zinc-900 dark:text-white">{result.name}</p>
                                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getTypeBadge(result.type)}`}>
                                                            Gallery
                                                        </span>
                                                    </div>
                                                    <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{result.subtitle}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-zinc-200 dark:border-zinc-800">
                                <button
                                    onClick={() => router.visit(`/search?q=${encodeURIComponent(query)}`)}
                                    className="w-full p-3 text-center text-sm font-medium text-purple-600 transition-colors hover:bg-zinc-50 dark:text-purple-400 dark:hover:bg-zinc-800"
                                >
                                    See all results ({totalResults})
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
