import SpaceCard from '@/components/Cards/SpaceCard';
import MainLayout from '@/components/Layout/MainLayout';
import FollowButton from '@/components/Profile/FollowButton';
import type { Gallery, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Building2, Calendar, MapPin, Star } from 'lucide-react';
import { useState } from 'react';

interface GalleryShowProps {
    gallery: Gallery;
}

type TabType = 'spaces' | 'about';

export default function Show({ gallery }: GalleryShowProps) {
    const { auth } = usePage<SharedData>().props;
    const [activeTab, setActiveTab] = useState<TabType>('spaces');

    const availableSpaces = gallery.spaces?.filter((s) => s.available) || [];
    const unavailableSpaces = gallery.spaces?.filter((s) => !s.available) || [];

    // Parse rating to show stars
    const ratingValue = parseFloat(gallery.rating);
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;

    return (
        <MainLayout title={gallery.name}>
            {/* Cover Banner */}
            <div className="relative h-48 bg-zinc-100 md:h-64"></div>

            {/* Profile Section */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-16 mb-8 md:-mt-20">
                    {/* Logo/Brand overlapping banner */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-end">
                        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl">
                            {gallery.user.avatar ? (
                                <img src={gallery.user.avatar} alt={gallery.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-4xl font-bold text-emerald-700">
                                    {gallery.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* Name and actions */}
                        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-zinc-900">{gallery.name}</h1>
                                <div className="mt-2 flex flex-wrap items-center gap-3">
                                    <span className="flex items-center gap-1 text-sm text-zinc-600">
                                        <MapPin className="h-4 w-4" />
                                        {gallery.location}
                                    </span>
                                    {ratingValue > 0 && (
                                        <span className="flex items-center gap-1 text-sm">
                                            {[...Array(fullStars)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            {hasHalfStar && (
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                                            )}
                                            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                                                <Star key={`empty-${i}`} className="h-4 w-4 text-zinc-300" />
                                            ))}
                                            <span className="ml-1 font-medium text-zinc-900">{gallery.rating}</span>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {auth.user && gallery.is_followed_by_auth !== null && (
                                <FollowButton
                                    following_id={gallery.id}
                                    following_type="gallery"
                                    is_following={gallery.is_followed_by_auth}
                                    size="lg"
                                />
                            )}
                        </div>
                    </div>

                    {/* Stats Bar */}
                    {gallery.stats && (
                        <div className="mt-6 flex flex-wrap gap-6 border-b border-zinc-200 pb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900">{gallery.stats.total_spaces}</span>
                                <span className="text-sm text-zinc-500">Spaces</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-emerald-600">{gallery.stats.available_spaces}</span>
                                <span className="text-sm text-zinc-500">Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900">{gallery.stats.total_exhibitions_hosted}</span>
                                <span className="text-sm text-zinc-500">Exhibitions</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900">{gallery.stats.followers_count}</span>
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
                        {gallery.description && (
                            <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-3 text-lg font-semibold text-zinc-900">About</h2>
                                <p className="text-sm leading-relaxed text-zinc-600">{gallery.description}</p>
                            </div>
                        )}

                        {/* Venue Info Card */}
                        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-zinc-900">Venue Information</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-2 text-zinc-600">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span>{gallery.location}</span>
                                </div>
                                {ratingValue > 0 && (
                                    <div className="flex items-center gap-2 text-zinc-600">
                                        <Star className="h-4 w-4" />
                                        <span>
                                            {gallery.rating} rating ({gallery.stats?.total_exhibitions_hosted || 0} exhibitions hosted)
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Building2 className="h-4 w-4" />
                                    <span>
                                        {gallery.stats?.available_spaces || 0} of {gallery.stats?.total_spaces || 0} spaces available
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Member since {new Date(gallery.user.created_at).getFullYear()}</span>
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
                                    onClick={() => setActiveTab('spaces')}
                                    className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                                        activeTab === 'spaces'
                                            ? 'border-emerald-600 text-emerald-600'
                                            : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                                    }`}
                                >
                                    Spaces ({gallery.spaces?.length || 0})
                                </button>
                                <button
                                    onClick={() => setActiveTab('about')}
                                    className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                                        activeTab === 'about'
                                            ? 'border-emerald-600 text-emerald-600'
                                            : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                                    }`}
                                >
                                    About
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'spaces' && (
                            <div className="space-y-8">
                                {availableSpaces.length > 0 && (
                                    <div>
                                        <h3 className="mb-4 text-xl font-semibold text-zinc-900">
                                            Available Spaces
                                            <span className="ml-2 text-sm font-normal text-emerald-600">
                                                ({availableSpaces.length})
                                            </span>
                                        </h3>
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            {availableSpaces.map((space) => (
                                                <SpaceCard key={space.id} space={space} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {unavailableSpaces.length > 0 && (
                                    <div>
                                        <h3 className="mb-4 text-xl font-semibold text-zinc-900">
                                            Currently Booked
                                            <span className="ml-2 text-sm font-normal text-zinc-500">
                                                ({unavailableSpaces.length})
                                            </span>
                                        </h3>
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            {unavailableSpaces.map((space) => (
                                                <SpaceCard key={space.id} space={space} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {(!gallery.spaces || gallery.spaces.length === 0) && (
                                    <p className="text-sm text-zinc-500">No spaces listed yet</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="space-y-6">
                                {gallery.description ? (
                                    <>
                                        <div>
                                            <h3 className="mb-3 text-lg font-semibold text-zinc-900">About {gallery.name}</h3>
                                            <p className="leading-relaxed text-zinc-600">{gallery.description}</p>
                                        </div>

                                        {gallery.user.bio && (
                                            <div>
                                                <h3 className="mb-3 text-lg font-semibold text-zinc-900">From the Team</h3>
                                                <p className="leading-relaxed text-zinc-600">{gallery.user.bio}</p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-sm text-zinc-500">No additional information available</p>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </MainLayout>
    );
}
