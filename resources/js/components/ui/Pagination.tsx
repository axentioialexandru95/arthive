import { Link } from "@inertiajs/react";
import type { PaginatedData } from "@/types";

interface PaginationProps {
    links: PaginatedData<unknown>["links"];
    meta: PaginatedData<unknown>["meta"];
}

export default function Pagination({ links, meta }: PaginationProps) {
    if (!meta || !links || meta.last_page <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-2">
            {links.prev && (
                <Link
                    href={links.prev}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                    Previous
                </Link>
            )}

            <div className="flex items-center gap-1">
                {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((page) => {
                    const isActive = page === meta.current_page;

                    // Show first page, last page, current page, and pages around current
                    if (page === 1 || page === meta.last_page || Math.abs(page - meta.current_page) <= 1) {
                        return (
                            <Link
                                key={page}
                                href={`?page=${page}`}
                                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                }`}
                            >
                                {page}
                            </Link>
                        );
                    }

                    // Show ellipsis
                    if (page === meta.current_page - 2 || page === meta.current_page + 2) {
                        return (
                            <span key={page} className="px-2 text-zinc-500">
                                ...
                            </span>
                        );
                    }

                    return null;
                })}
            </div>

            {links.next && (
                <Link
                    href={links.next}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                    Next
                </Link>
            )}
        </div>
    );
}
