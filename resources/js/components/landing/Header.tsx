import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

export function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/60"
        >
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between gap-4">
                    <Link href="/" className="flex shrink-0 items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900">
                            <Palette className="h-6 w-6" />
                        </div>
                        <span className="hidden text-2xl font-bold sm:inline">ArtHive</span>
                    </Link>

                    <div className="hidden flex-1 md:block">
                        <SearchBar />
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="shrink-0">
                        <Button variant="outline" asChild>
                            <a href="/auth">Sign In</a>
                        </Button>
                    </motion.div>
                </div>

                <div className="pb-4 md:hidden">
                    <SearchBar />
                </div>
            </div>
        </motion.header>
    );
}
