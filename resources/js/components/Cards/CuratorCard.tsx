import { Link } from "@inertiajs/react";
import type { Curator } from "@/types";
import { MapPin, Sparkles } from "lucide-react";

interface CuratorCardProps {
    curator: Curator;
}

export default function CuratorCard({ curator }: CuratorCardProps) {
    return (
        <Link href={`/curators/${curator.id}`}>
            <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-xl hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 h-full">
                <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                        <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 ring-2 ring-blue-100 dark:from-blue-900/30 dark:to-cyan-900/30 dark:ring-blue-900/50">
                            {curator.user.avatar ? (
                                <img src={curator.user.avatar} alt={curator.user.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400">
                                    {curator.user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {curator.user.name}
                        </h3>
                        {curator.experience && (
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                                {curator.experience}
                            </p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                            <div className="flex items-center gap-1">
                                <Sparkles className="h-3.5 w-3.5" />
                                <span className="font-semibold text-zinc-900 dark:text-zinc-50">{curator.exhibitions_count}</span>
                                <span>exhibitions</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-zinc-900 dark:text-zinc-50">{curator.followers_count}</span>
                                <span>followers</span>
                            </div>
                        </div>

                        {curator.location && (
                            <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-500">
                                <MapPin className="h-3.5 w-3.5" />
                                <span className="truncate">{curator.location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
