import { useState } from "react";
import type { Space } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface SpaceCardProps {
    space: Space;
}

export default function SpaceCard({ space }: SpaceCardProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const images = space.images || [];

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            {images.length > 0 && (
                <div className="group relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <img src={images[currentImage].image_path} alt={space.name} className="h-full w-full object-cover" />
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100 dark:bg-zinc-800/80 dark:hover:bg-zinc-800"
                            >
                                ←
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100 dark:bg-zinc-800/80 dark:hover:bg-zinc-800"
                            >
                                →
                            </button>
                            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                                {images.map((_, i) => (
                                    <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === currentImage ? "bg-white" : "bg-white/50"}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{space.name}</span>
                    {space.available && (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">Available</span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-2 flex gap-4 text-sm">
                    <div>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-50">{space.size_sqm}</span>
                        <span className="text-zinc-500 dark:text-zinc-400"> m²</span>
                    </div>
                    <div>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-50">{space.price}</span>
                        <span className="text-zinc-500 dark:text-zinc-400"> /event</span>
                    </div>
                </div>
                {space.description && <p className="mb-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{space.description}</p>}
                {space.facilities && space.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {space.facilities.slice(0, 3).map((facility, i) => (
                            <span key={i} className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                                {facility}
                            </span>
                        ))}
                        {space.facilities.length > 3 && <span className="text-xs text-zinc-500">+{space.facilities.length - 3} more</span>}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
