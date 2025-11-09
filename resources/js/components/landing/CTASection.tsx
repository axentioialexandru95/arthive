import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
    return (
        <section className="container mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl border border-zinc-200/50 bg-white/40 p-12 text-center shadow-xl backdrop-blur-xl md:p-20 dark:border-zinc-800/50 dark:bg-zinc-900/40"
            >
                <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
                <div className="absolute -right-24 -bottom-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 dark:border-purple-900 dark:bg-purple-950 dark:text-purple-300"
                    >
                        <Sparkles className="h-4 w-4" />
                        Start your art journey
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6 text-4xl font-bold md:text-5xl"
                    >
                        Transform your vision into reality
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mx-auto mb-10 max-w-2xl text-xl text-zinc-600 md:text-2xl dark:text-zinc-400"
                    >
                        Join the ArtHive community and discover a new way to create, organize, and participate in art exhibitions
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col gap-4 sm:flex-row sm:justify-center"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" className="text-lg shadow-lg" asChild>
                                <a href="/auth">
                                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" variant="outline" className="text-lg" asChild>
                                <a href="#features">Explore Platform</a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
