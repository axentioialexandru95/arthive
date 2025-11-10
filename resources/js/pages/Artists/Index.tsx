import ArtistCard from '@/components/Cards/ArtistCard';
import MainLayout from '@/components/Layout/MainLayout';
import Pagination from '@/components/ui/Pagination';
import type { Artist, PaginatedData } from '@/types';

interface ArtistsIndexProps {
    artists: PaginatedData<Artist>;
}

export default function Index({ artists }: ArtistsIndexProps) {
    return (
        <MainLayout title="Discover Artists">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900">Discover Artists</h1>
                    <p className="mt-2 text-zinc-600">Explore talented artists and their creative works</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {artists.data.map((artist) => (
                        <ArtistCard key={artist.id} artist={artist} />
                    ))}
                </div>

                {artists.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-zinc-500">No artists found</p>
                    </div>
                )}

                {artists.data.length > 0 && (
                    <div className="mt-8">
                        <Pagination links={artists.links} meta={artists.meta} />
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
