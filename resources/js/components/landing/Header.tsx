import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Palette } from 'lucide-react';

const getDashboardUrl = (role: string): string => {
    switch (role) {
        case 'admin':
            return '/admin';
        case 'artist':
            return '/artist';
        case 'curator':
            return '/curator';
        case 'gallery':
            return '/gallery';
        default:
            return '/auth';
    }
};

export function Header() {
    const { auth } = usePage<SharedData>().props;

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/60"
        >
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between gap-2 sm:gap-3">
                    <Link href="/" className="flex shrink-0 items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white sm:h-10 sm:w-10 dark:bg-zinc-50 dark:text-zinc-900">
                            <Palette className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <span className="hidden text-xl font-bold text-zinc-900 sm:inline dark:text-zinc-50">ArtHive</span>
                    </Link>

                    <div className="flex-1">
                        <SearchBar />
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="shrink-0">
                        <Button variant="outline" asChild className="h-9 w-9 p-0 sm:h-10 sm:w-auto sm:px-4 sm:py-2">
                            {auth.user ? (
                                <a href={getDashboardUrl(auth.user.role)} className="flex items-center justify-center gap-2">
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span className="hidden sm:inline">Dashboard</span>
                                </a>
                            ) : (
                                <a href="/auth" className="flex items-center justify-center">
                                    <span className="hidden sm:inline">Sign In</span>
                                    <LayoutDashboard className="h-4 w-4 sm:hidden" />
                                </a>
                            )}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
}
