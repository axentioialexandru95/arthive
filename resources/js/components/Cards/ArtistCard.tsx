import type { Artist } from '@/types';
import { Link } from '@inertiajs/react';
import { Image, MapPin } from 'lucide-react';

interface ArtistCardProps {
    artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
    return (
        <Link href={`/artists/${artist.id}`}>
            <div className="group relative h-full overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
                <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                        <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-purple-100 to-pink-100 ring-2 ring-purple-100 dark:from-purple-900/30 dark:to-pink-900/30 dark:ring-purple-900/50">
                            {artist.user.avatar ? (
                                <img src={artist.user.avatar} alt={artist.user.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-purple-600 dark:text-purple-400">
                                    {artist.user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="mb-1 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-purple-600 dark:text-zinc-50 dark:group-hover:text-purple-400">
                            {artist.user.name}
                        </h3>
                        {artist.specialization && <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">{artist.specialization}</p>}

                        <div className="mb-3 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-zinc-900 dark:text-zinc-50">{artist.followers_count}</span>
                                <span>followers</span>
                            </div>
                            {artist.artworks_count !== undefined && (
                                <div className="flex items-center gap-1">
                                    <Image className="h-3.5 w-3.5" />
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">{artist.artworks_count}</span>
                                </div>
                            )}
                        </div>

                        {artist.location && (
                            <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-500">
                                <MapPin className="h-3.5 w-3.5" />
                                <span className="truncate">{artist.location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
