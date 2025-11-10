import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export function Hero() {
    return (
        <section className="container mx-auto px-4 py-20 text-center">
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="mx-auto max-w-4xl">
                <motion.h1 variants={fadeInUp} className="mb-6 text-5xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl">
                    Connect{' '}
                    <motion.span
                        initial={{ backgroundPosition: '0% 50%' }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] bg-clip-text text-transparent"
                    >
                        artists
                    </motion.span>
                    ,{' '}
                    <motion.span
                        initial={{ backgroundPosition: '0% 50%' }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 1 }}
                        className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent"
                    >
                        curators
                    </motion.span>
                    , and{' '}
                    <motion.span
                        initial={{ backgroundPosition: '0% 50%' }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 2 }}
                        className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-[length:200%_auto] bg-clip-text text-transparent"
                    >
                        galleries
                    </motion.span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="mb-10 text-xl text-zinc-600 md:text-2xl">
                    ArtHive is the platform that simplifies art exhibition organization. Find talent by style and medium, rent galleries with a click,
                    announce exhibitions, and build a vibrant community – all in one place.
                </motion.p>
                <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" className="text-lg" asChild>
                            <a href="/auth">Get Started</a>
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" variant="outline" className="text-lg" asChild>
                            <a href="/search">Explore Platform</a>
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
