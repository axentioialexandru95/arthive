import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Building2, Palette, Users } from 'lucide-react';

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
};

const features = [
    {
        icon: Palette,
        title: 'Smart Search',
        description: 'Find artists by style, medium, and location. Advanced filtering for perfect results.',
        color: 'purple',
    },
    {
        icon: Building2,
        title: 'Exhibition Spaces',
        description: 'Explore and rent galleries by size, price, and amenities. Simple and fast booking.',
        color: 'blue',
    },
    {
        icon: Users,
        title: 'Active Community',
        description: 'Follow artists, curators, and galleries. Dynamic feed with the latest announcements and exhibitions.',
        color: 'orange',
    },
];

export function Features() {
    return (
        <section id="features" className="container mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
            >
                <h2 className="mb-4 text-4xl font-bold">Why ArtHive?</h2>
                <p className="text-xl text-zinc-600">Everything you need for successful exhibitions</p>
            </motion.div>
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
                {features.map((feature, index) => (
                    <motion.div key={index} variants={scaleIn} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
                        <Card className={`h-full border-2 transition-all hover:border-${feature.color}-500 hover:shadow-lg`}>
                            <CardHeader>
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-${feature.color}-100`}
                                >
                                    <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                                </motion.div>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
