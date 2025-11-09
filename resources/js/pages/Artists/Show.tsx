import type { Artist } from '@/types';
import MainLayout from '@/components/Layout/MainLayout';
import FollowButton from '@/components/Profile/FollowButton';
import ArtworkCard from '@/components/Cards/ArtworkCard';
import ExhibitionCard from '@/components/Cards/ExhibitionCard';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { MapPin, Palette as PaletteIcon, Image, Award, Users } from 'lucide-react';

interface ArtistShowProps {
    artist: Artist;
}

export default function Show({ artist }: ArtistShowProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <MainLayout title={artist.user.name}>
            {/* Hero Section with Gradient Background */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
                        {/* Avatar with gradient border */}
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur"></div>
                            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-white dark:bg-zinc-900 md:h-40 md:w-40">
                                {artist.user.avatar ? (
                                    <img src={artist.user.avatar} alt={artist.user.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-5xl font-bold text-white md:text-6xl">
                                        {artist.user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info & Actions */}
                        <div className="flex-1">
                            <h1 className="mb-2 text-4xl font-bold text-zinc-900 md:text-5xl dark:text-zinc-50">{artist.user.name}</h1>

                            <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-zinc-600 md:justify-start dark:text-zinc-400">
                                {artist.specialization && (
                                    <div className="flex items-center gap-1.5">
                                        <PaletteIcon className="h-4 w-4" />
                                        <span className="text-sm font-medium">{artist.specialization}</span>
                                    </div>
                                )}
                                {artist.location && (
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm">{artist.location}</span>
                                    </div>
                                )}
                            </div>

                            {/* Stats Row */}
                            {artist.stats && (
                                <div className="mb-6 flex flex-wrap items-center justify-center gap-6 md:justify-start">
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center gap-1.5">
                                            <Image className="h-4 w-4 text-zinc-500" />
                                            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{artist.stats.total_artworks}</div>
                                        </div>
                                        <div className="text-sm text-zinc-600 dark:text-zinc-400">Artworks</div>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center gap-1.5">
                                            <Award className="h-4 w-4 text-zinc-500" />
                                            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{artist.stats.total_exhibitions}</div>
                                        </div>
                                        <div className="text-sm text-zinc-600 dark:text-zinc-400">Exhibitions</div>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="h-4 w-4 text-zinc-500" />
                                            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{artist.stats.followers_count}</div>
                                        </div>
                                        <div className="text-sm text-zinc-600 dark:text-zinc-400">Followers</div>
                                    </div>
                                </div>
                            )}

                            {/* Follow Button - Only show if authenticated */}
                            {auth.user && artist.is_followed_by_auth !== null && (
                                <FollowButton following_id={artist.id} following_type="artist" is_following={artist.is_followed_by_auth} />
                            )}

                            {!auth.user && (
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    <a href="/auth" className="font-medium text-purple-600 hover:underline dark:text-purple-400">
                                        Sign in
                                    </a>{' '}
                                    to follow this artist
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                {/* Bio Section */}
                {artist.user.bio && (
                    <div className="mb-12">
                        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50">About</h2>
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{artist.user.bio}</p>
                        </div>
                    </div>
                )}

                {/* Albums & Artworks Section */}
                {artist.albums && artist.albums.length > 0 && (
                    <div className="mb-12">
                        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50">Artworks</h2>
                        <div className="space-y-12">
                            {artist.albums.map((album) => (
                                <div key={album.id} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                    <div className="mb-6 border-b border-zinc-200 pb-4 dark:border-zinc-800">
                                        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{album.title}</h3>
                                        {album.description && <p className="mt-2 text-zinc-600 dark:text-zinc-400">{album.description}</p>}
                                    </div>
                                    {album.artworks && album.artworks.length > 0 && (
                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {album.artworks.map((artwork) => (
                                                <ArtworkCard key={artwork.id} artwork={artwork} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Exhibitions Section */}
                {artist.exhibitions && artist.exhibitions.length > 0 && (
                    <div className="mb-12">
                        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50">Exhibitions</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {artist.exhibitions.map((exhibition) => (
                                <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
