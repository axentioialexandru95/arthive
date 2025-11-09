import type { Artwork } from "@/types";

interface ArtworkCardProps {
    artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
    return (
        <div className="group cursor-pointer overflow-hidden rounded-lg bg-zinc-100 transition-all hover:shadow-lg dark:bg-zinc-900">
            <div className="aspect-square overflow-hidden">
                <img
                    src={artwork.image_path}
                    alt={artwork.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-3">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{artwork.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {artwork.medium} • {artwork.year}
                </p>
            </div>
        </div>
    );
}
