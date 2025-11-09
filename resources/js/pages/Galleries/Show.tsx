import type { Gallery } from "@/types";
import MainLayout from "@/Components/Layout/MainLayout";
import FollowButton from "@/Components/Profile/FollowButton";
import StatsBar from "@/Components/Profile/StatsBar";
import SpaceCard from "@/Components/Cards/SpaceCard";

interface GalleryShowProps {
    gallery: Gallery;
}

export default function Show({ gallery }: GalleryShowProps) {
    return (
        <MainLayout title={gallery.name}>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mb-8 rounded-lg border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-8 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{gallery.name}</h1>
                                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{gallery.location}</p>
                            </div>
                            <FollowButton following_id={gallery.id} following_type="gallery" is_following={gallery.is_followed_by_auth} />
                        </div>
                        {gallery.stats && (
                            <StatsBar
                                stats={[
                                    { label: "Spaces", value: gallery.stats.total_spaces },
                                    { label: "Available", value: gallery.stats.available_spaces },
                                    { label: "Exhibitions", value: gallery.stats.total_exhibitions_hosted },
                                    { label: "Rating", value: gallery.stats.rating },
                                    { label: "Followers", value: gallery.stats.followers_count },
                                ]}
                            />
                        )}
                    </div>
                </div>

                {/* Description Section */}
                {gallery.description && (
                    <div className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">About</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">{gallery.description}</p>
                    </div>
                )}

                {/* Spaces Section */}
                {gallery.spaces && gallery.spaces.length > 0 && (
                    <div>
                        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Available Spaces</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {gallery.spaces.map((space) => (
                                <SpaceCard key={space.id} space={space} />
                            ))}
                        </div>
                    </div>
                )}

                {(!gallery.spaces || gallery.spaces.length === 0) && (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-200 py-12 text-center dark:border-zinc-800">
                        <p className="text-zinc-500 dark:text-zinc-400">No spaces listed yet</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
