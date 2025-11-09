import { CTASection } from '@/components/landing/CTASection';
import { Features } from '@/components/landing/Features';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { RolesSection } from '@/components/landing/RolesSection';
import { ArtistsShowcase } from '@/components/landing/ArtistsShowcase';
import { Head } from '@inertiajs/react';
import type { Artist } from '@/types/models';

interface WelcomeProps {
    artists: Artist[];
}

export default function Welcome({ artists }: WelcomeProps) {
    return (
        <>
            <Head title="Welcome to ArtHive">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
                <Header />
                <Hero />
                <ArtistsShowcase artists={artists} />
                <Features />
                <div className="bg-zinc-100 py-0 dark:bg-zinc-900">
                    <RolesSection />
                </div>
                <CTASection />
                <Footer />
            </div>
        </>
    );
}
