import { Link } from "@inertiajs/react";
import type { Exhibition } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ExhibitionCardProps {
    exhibition: Exhibition;
    compact?: boolean;
}

export default function ExhibitionCard({ exhibition, compact = false }: ExhibitionCardProps) {
    const getStatusBadge = (status: string) => {
        const badges = {
            active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
            upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
            completed: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100",
        };

        return badges[status as keyof typeof badges] || badges.completed;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            {exhibition.cover_image && (
                <div className="aspect-video overflow-hidden">
                    <img src={exhibition.cover_image} alt={exhibition.title} className="h-full w-full object-cover" />
                </div>
            )}
            <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">
                        <Link href={`/exhibitions/${exhibition.slug}`} className="hover:underline">
                            {exhibition.title}
                        </Link>
                    </CardTitle>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(exhibition.status)}`}>
                        {exhibition.status}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {formatDate(exhibition.start_date)} - {formatDate(exhibition.end_date)}
                </p>
                {exhibition.space && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {exhibition.space.gallery.name}, {exhibition.space.gallery.location}
                    </p>
                )}
                {!compact && exhibition.description && <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{exhibition.description}</p>}
            </CardContent>
        </Card>
    );
}
