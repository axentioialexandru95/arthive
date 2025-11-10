import CuratorCard from '@/components/Cards/CuratorCard';
import MainLayout from '@/components/Layout/MainLayout';
import Pagination from '@/components/ui/Pagination';
import type { Curator, PaginatedData } from '@/types';

interface CuratorsIndexProps {
    curators: PaginatedData<Curator>;
}

export default function Index({ curators }: CuratorsIndexProps) {
    return (
        <MainLayout title="Discover Curators">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900">Discover Curators</h1>
                    <p className="mt-2 text-zinc-600">Connect with experienced exhibition curators</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {curators.data.map((curator) => (
                        <CuratorCard key={curator.id} curator={curator} />
                    ))}
                </div>

                {curators.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-zinc-500">No curators found</p>
                    </div>
                )}

                {curators.data.length > 0 && (
                    <div className="mt-8">
                        <Pagination links={curators.links} meta={curators.meta} />
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
