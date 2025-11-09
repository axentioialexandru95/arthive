import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChevronDown, LayoutDashboard, LogOut, Palette, User } from 'lucide-react';
import { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-white dark:bg-zinc-950">
                <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/60">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between gap-4">
                            <Link href="/" className="flex shrink-0 items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900">
                                    <Palette className="h-6 w-6" />
                                </div>
                                <span className="hidden text-xl font-bold text-zinc-900 sm:inline dark:text-zinc-50">ArtHive</span>
                            </Link>

                            <div className="hidden flex-1 md:block">
                                <SearchBar />
                            </div>

                            {auth.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex items-center gap-2">
                                            {auth.user.avatar ? (
                                                <img src={auth.user.avatar} alt={auth.user.name} className="h-6 w-6 rounded-full" />
                                            ) : (
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold dark:bg-zinc-700">
                                                    {auth.user.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <span className="hidden sm:inline">{auth.user.name}</span>
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <a href="/admin" className="flex cursor-pointer items-center">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </a>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <a href="/profile" className="flex cursor-pointer items-center">
                                                <User className="mr-2 h-4 w-4" />
                                                Profile
                                            </a>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <form method="POST" action="/admin/logout" className="w-full">
                                                <button type="submit" className="flex w-full cursor-pointer items-center">
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Logout
                                                </button>
                                            </form>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="shrink-0">
                                    <Button variant="outline" asChild>
                                        <a href="/auth">Sign In</a>
                                    </Button>
                                </motion.div>
                            )}
                        </div>

                        <div className="pb-4 md:hidden">
                            <SearchBar />
                        </div>
                    </div>
                </header>

                <main>{children}</main>

                <footer className="border-t border-zinc-200 dark:border-zinc-800">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                            &copy; 2025 ArtHive. All rights reserved.
                            <br />
                            <span className="mt-2 inline-block text-sm text-zinc-500 dark:text-zinc-500">
                                Made by{' '}
                                <a
                                    href="https://phantomtechind.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                                >
                                    phantomtechind.com
                                </a>
                            </span>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
