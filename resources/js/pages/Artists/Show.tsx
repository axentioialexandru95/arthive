import ArtworkCard from '@/components/Cards/ArtworkCard';
import ExhibitionCard from '@/components/Cards/ExhibitionCard';
import MainLayout from '@/components/Layout/MainLayout';
import FollowButton from '@/components/Profile/FollowButton';
import type { Artist, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Calendar, Image as ImageIcon, MapPin } from 'lucide-react';
import { useState } from 'react';

interface ArtistShowProps {
    artist: Artist;
}

type TabType = 'gallery' | 'albums' | 'exhibitions';

export default function Show({ artist }: ArtistShowProps) {
    const { auth } = usePage<SharedData>().props;
    const [activeTab, setActiveTab] = useState<TabType>('gallery');

    // Flatten all artworks for gallery view
    const allArtworks = artist.albums?.flatMap((album) => album.artworks || []) || [];

    return (
        <MainLayout title={artist.user.name}>
            {/* Cover Banner */}
            <div className="relative h-48 bg-zinc-100 md:h-64"></div>

            {/* Profile Section */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-16 mb-8 md:-mt-20">
                    {/* Avatar overlapping banner */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-end">
                        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">
                            {artist.user.avatar ? (
                                <img src={artist.user.avatar} alt={artist.user.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-zinc-200 text-4xl font-bold text-zinc-600">
                                    {artist.user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* Name and actions */}
                        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-zinc-900">{artist.user.name}</h1>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
                                    {artist.specialization && <span>{artist.specialization}</span>}
                                    {artist.location && (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {artist.location}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {auth.user && artist.is_followed_by_auth !== null && (
                                <FollowButton following_id={artist.id} following_type="artist" is_following={artist.is_followed_by_auth} size="lg" />
                            )}
                        </div>
                    </div>

                    {/* Stats Bar */}
                    {artist.stats && (
                        <div className="mt-6 flex flex-wrap gap-6 border-b border-zinc-200 pb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900">{artist.stats.total_artworks}</span>
                                <span className="text-sm text-zinc-500">Artworks</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900">{artist.stats.total_albums}</span>
                                <span className="text-sm text-zinc-500">Albums</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900">{artist.stats.total_exhibitions}</span>
                                <span className="text-sm text-zinc-500">Exhibitions</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900">{artist.stats.followers_count}</span>
                                <span className="text-sm text-zinc-500">Followers</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Two Column Layout */}
                <div className="flex flex-col gap-8 pb-12 lg:flex-row">
                    {/* Left Sidebar */}
                    <aside className="w-full shrink-0 lg:w-80">
                        {/* About Card */}
                        {artist.user.bio && (
                            <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-3 text-lg font-semibold text-zinc-900">About</h2>
                                <p className="text-sm leading-relaxed text-zinc-600">{artist.user.bio}</p>
                            </div>
                        )}

                        {/* Stats Card */}
                        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-zinc-900">Profile</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Member since {new Date(artist.user.created_at).getFullYear()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <ImageIcon className="h-4 w-4" />
                                    <span>{artist.stats?.total_artworks || 0} artworks</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="min-w-0 flex-1">
                        {/* Tabs */}
                        <div className="mb-6 border-b border-zinc-200">
                            <nav className="-mb-px flex gap-8">
                                <button
                                    onClick={() => setActiveTab('gallery')}
                                    className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                                        activeTab === 'gallery'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                                    }`}
                                >
                                    Gallery
                                </button>
                                <button
                                    onClick={() => setActiveTab('albums')}
                                    className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                                        activeTab === 'albums'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                                    }`}
                                >
                                    Albums
                                </button>
                                <button
                                    onClick={() => setActiveTab('exhibitions')}
                                    className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                                        activeTab === 'exhibitions'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                                    }`}
                                >
                                    Exhibitions
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'gallery' && (
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {allArtworks.map((artwork) => (
                                    <ArtworkCard key={artwork.id} artwork={artwork} />
                                ))}
                            </div>
                        )}

                        {activeTab === 'albums' && (
                            <div className="space-y-8">
                                {artist.albums?.map((album) => (
                                    <div key={album.id}>
                                        <h3 className="mb-4 text-xl font-semibold text-zinc-900">{album.title}</h3>
                                        {album.description && <p className="mb-4 text-sm text-zinc-600">{album.description}</p>}
                                        {album.artworks && album.artworks.length > 0 && (
                                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                                {album.artworks.map((artwork) => (
                                                    <ArtworkCard key={artwork.id} artwork={artwork} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'exhibitions' && (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {artist.exhibitions?.map((exhibition) => (
                                    <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </MainLayout>
    );
}
