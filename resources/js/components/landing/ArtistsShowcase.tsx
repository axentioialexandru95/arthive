import { ArtistCard } from '@/components/artists/ArtistCard';
import { Button } from '@/components/ui/button';
import type { Artist } from '@/types/models';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

interface ArtistsShowcaseProps {
    artists: Artist[];
}

export function ArtistsShowcase({ artists }: ArtistsShowcaseProps) {
    if (!artists || artists.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
            >
                <h2 className="mb-4 text-4xl font-bold">Featured Artists</h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400">Discover talented artists from our community</p>
            </motion.div>

            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {artists.map((artist) => (
                    <motion.div key={artist.id} variants={fadeInUp}>
                        <ArtistCard artist={artist} />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 text-center"
            >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="text-lg">
                        Explore All Artists <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
