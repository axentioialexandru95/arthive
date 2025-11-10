import GalleryCard from '@/components/Cards/GalleryCard';
import MainLayout from '@/components/Layout/MainLayout';
import Pagination from '@/components/ui/Pagination';
import type { Gallery, PaginatedData } from '@/types';

interface GalleriesIndexProps {
    galleries: PaginatedData<Gallery>;
}

export default function Index({ galleries }: GalleriesIndexProps) {
    return (
        <MainLayout title="Discover Galleries">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900">Discover Galleries</h1>
                    <p className="mt-2 text-zinc-600">Find the perfect space for your exhibition</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {galleries.data.map((gallery) => (
                        <GalleryCard key={gallery.id} gallery={gallery} />
                    ))}
                </div>

                {galleries.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-zinc-500">No galleries found</p>
                    </div>
                )}

                {galleries.data.length > 0 && (
                    <div className="mt-8">
                        <Pagination links={galleries.links} meta={galleries.meta} />
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
