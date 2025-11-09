import type { Curator } from '@/types';
import MainLayout from '@/components/Layout/MainLayout';
import FollowButton from '@/components/Profile/FollowButton';
import ExhibitionCard from '@/components/Cards/ExhibitionCard';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { MapPin, Calendar, Award } from 'lucide-react';
import { useState } from 'react';

interface CuratorShowProps {
    curator: Curator;
}

type TabType = 'active' | 'upcoming' | 'past';

export default function Show({ curator }: CuratorShowProps) {
    const { auth } = usePage<SharedData>().props;
    const [activeTab, setActiveTab] = useState<TabType>('active');

    const activeExhibitions = curator.exhibitions?.filter((e) => e.status === 'active') || [];
    const upcomingExhibitions = curator.exhibitions?.filter((e) => e.status === 'upcoming') || [];
    const pastExhibitions = curator.exhibitions?.filter((e) => e.status === 'completed') || [];

    return (
        <MainLayout title={curator.user.name}>
            {/* Cover Banner */}
            <div className="relative h-48 bg-zinc-100 md:h-64 dark:bg-zinc-900"></div>

            {/* Profile Section */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-16 mb-8 md:-mt-20">
                    {/* Avatar overlapping banner */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-end">
                        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl dark:border-zinc-900 dark:bg-zinc-900">
                            {curator.user.avatar ? (
                                <img src={curator.user.avatar} alt={curator.user.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-zinc-200 text-4xl font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                    {curator.user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* Name and actions */}
                        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{curator.user.name}</h1>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                    {curator.experience && <span>{curator.experience}</span>}
                                    {curator.location && (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {curator.location}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {auth.user && curator.is_followed_by_auth !== null && (
                                <FollowButton following_id={curator.id} following_type="curator" is_following={curator.is_followed_by_auth} size="lg" />
                            )}
                        </div>
                    </div>

                    {/* Stats Bar */}
                    {curator.stats && (
                        <div className="mt-6 flex flex-wrap gap-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{curator.stats.total_exhibitions}</span>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">Exhibitions</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{curator.stats.active_exhibitions}</span>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">Active</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{curator.stats.total_artists_worked_with}</span>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">Artists</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{curator.stats.followers_count}</span>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">Followers</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Two Column Layout */}
                <div className="flex flex-col gap-8 pb-12 lg:flex-row">
                    {/* Left Sidebar */}
                    <aside className="w-full shrink-0 lg:w-80">
                        {/* About Card */}
                        {curator.user.bio && (
                            <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">About</h2>
                                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{curator.user.bio}</p>
                            </div>
                        )}

                        {/* Stats Card */}
                        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Profile</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                    <Calendar className="h-4 w-4" />
                                    <span>Member since {new Date(curator.user.created_at).getFullYear()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                    <Award className="h-4 w-4" />
                                    <span>{curator.stats?.total_exhibitions || 0} exhibitions curated</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="min-w-0 flex-1">
                        {/* Tabs */}
                        <div className="mb-6 border-b border-zinc-200 dark:border-zinc-800">
                            <nav className="-mb-px flex gap-8">
                                <button
                                    onClick={() => setActiveTab('active')}
                                    className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                                        activeTab === 'active'
                                            ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                            : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                                >
                                    Active ({activeExhibitions.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('upcoming')}
                                    className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                                        activeTab === 'upcoming'
                                            ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                            : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                                >
                                    Upcoming ({upcomingExhibitions.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('past')}
                                    className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                                        activeTab === 'past'
                                            ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                            : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                                >
                                    Past ({pastExhibitions.length})
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'active' && (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {activeExhibitions.map((exhibition) => (
                                    <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
                                ))}
                                {activeExhibitions.length === 0 && <p className="text-sm text-zinc-500 dark:text-zinc-400">No active exhibitions</p>}
                            </div>
                        )}

                        {activeTab === 'upcoming' && (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {upcomingExhibitions.map((exhibition) => (
                                    <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
                                ))}
                                {upcomingExhibitions.length === 0 && <p className="text-sm text-zinc-500 dark:text-zinc-400">No upcoming exhibitions</p>}
                            </div>
                        )}

                        {activeTab === 'past' && (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {pastExhibitions.map((exhibition) => (
                                    <ExhibitionCard key={exhibition.id} exhibition={exhibition} compact />
                                ))}
                                {pastExhibitions.length === 0 && <p className="text-sm text-zinc-500 dark:text-zinc-400">No past exhibitions</p>}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </MainLayout>
    );
}
