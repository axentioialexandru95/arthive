import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

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

const footerLinks = [
    {
        title: 'Product',
        links: ['Features', 'Pricing', 'Case Studies', 'Updates'],
    },
    {
        title: 'Company',
        links: ['About Us', 'Team', 'Careers', 'Contact'],
    },
    {
        title: 'Resources',
        links: ['Blog', 'Guides', 'Documentation', 'Support'],
    },
];

export function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-5"
                >
                    <motion.div variants={fadeInUp} className="lg:col-span-2">
                        <div className="mb-4 flex items-center gap-2">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                            >
                                <Palette className="h-6 w-6" />
                            </motion.div>
                            <span className="text-2xl font-bold">ArtHive</span>
                        </div>
                        <p className="mb-4 max-w-xs text-zinc-600 dark:text-zinc-400">
                            The platform connecting artists, curators, and galleries for memorable art exhibitions.
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-500">&copy; 2025 ArtHive. All rights reserved.</p>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
                            Made by{' '}
                            <a
                                href="https://phantomtechind.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                            >
                                phantomtechind.com
                            </a>
                        </p>
                    </motion.div>
                    {footerLinks.map((section, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <h3 className="mb-4 font-semibold">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href="#"
                                            className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </footer>
    );
}
