import type { Curator } from "@/types";
import MainLayout from "@/Components/Layout/MainLayout";
import FollowButton from "@/Components/Profile/FollowButton";
import StatsBar from "@/Components/Profile/StatsBar";
import ExhibitionCard from "@/Components/Cards/ExhibitionCard";

interface CuratorShowProps {
    curator: Curator;
}

export default function Show({ curator }: CuratorShowProps) {
    const activeExhibitions = curator.exhibitions?.filter((e) => e.status === "active") || [];
    const upcomingExhibitions = curator.exhibitions?.filter((e) => e.status === "upcoming") || [];
    const pastExhibitions = curator.exhibitions?.filter((e) => e.status === "completed") || [];

    return (
        <MainLayout title={curator.user.name}>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mb-8 rounded-lg border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-8 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
                    <div className="flex flex-col items-start gap-6 md:flex-row">
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                            {curator.user.avatar ? (
                                <img src={curator.user.avatar} alt={curator.user.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-zinc-500">
                                    {curator.user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                <div>
                                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{curator.user.name}</h1>
                                    <div className="mt-1 flex flex-wrap gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                        {curator.experience && <span>{curator.experience}</span>}
                                        {curator.location && (
                                            <>
                                                {curator.experience && <span>•</span>}
                                                <span>{curator.location}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <FollowButton following_id={curator.id} following_type="curator" is_following={curator.is_followed_by_auth} />
                            </div>
                            {curator.stats && (
                                <StatsBar
                                    stats={[
                                        { label: "Exhibitions", value: curator.stats.total_exhibitions },
                                        { label: "Active", value: curator.stats.active_exhibitions },
                                        { label: "Artists", value: curator.stats.total_artists_worked_with },
                                        { label: "Followers", value: curator.stats.followers_count },
                                    ]}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                {curator.user.bio && (
                    <div className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">About</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">{curator.user.bio}</p>
                    </div>
                )}

                {/* Exhibitions Sections */}
                {activeExhibitions.length > 0 && (
                    <div className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Active Exhibitions</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {activeExhibitions.map((exhibition) => (
                                <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
                            ))}
                        </div>
                    </div>
                )}

                {upcomingExhibitions.length > 0 && (
                    <div className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Upcoming Exhibitions</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {upcomingExhibitions.map((exhibition) => (
                                <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
                            ))}
                        </div>
                    </div>
                )}

                {pastExhibitions.length > 0 && (
                    <div>
                        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Past Exhibitions</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {pastExhibitions.map((exhibition) => (
                                <ExhibitionCard key={exhibition.id} exhibition={exhibition} compact />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
