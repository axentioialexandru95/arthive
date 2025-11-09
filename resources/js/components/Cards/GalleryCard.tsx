import { Link } from "@inertiajs/react";
import type { Gallery } from "@/types";
import { MapPin, Star, Building2 } from "lucide-react";

interface GalleryCardProps {
    gallery: Gallery;
}

export default function GalleryCard({ gallery }: GalleryCardProps) {
    return (
        <Link href={`/galleries/${gallery.id}`}>
            <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-xl hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 h-full">
                <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                        <div className="h-16 w-16 overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 ring-2 ring-orange-100 dark:from-orange-900/30 dark:to-amber-900/30 dark:ring-orange-900/50 flex items-center justify-center">
                            <Building2 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {gallery.name}
                        </h3>

                        {gallery.description && (
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
                                {gallery.description}
                            </p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                            <div className="flex items-center gap-1">
                                <Building2 className="h-3.5 w-3.5" />
                                <span className="font-semibold text-zinc-900 dark:text-zinc-50">{gallery.spaces_count || 0}</span>
                                <span>spaces</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                <span className="font-semibold text-zinc-900 dark:text-zinc-50">{gallery.rating}</span>
                            </div>
                        </div>

                        {gallery.location && (
                            <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-500">
                                <MapPin className="h-3.5 w-3.5" />
                                <span className="truncate">{gallery.location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
