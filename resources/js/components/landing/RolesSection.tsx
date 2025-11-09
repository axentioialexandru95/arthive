import { Palette, Users, Building2, Eye, Check } from 'lucide-react';

const roles = [
    {
        icon: Palette,
        title: 'For Artists',
        description: 'Showcase your work and connect',
        color: 'blue',
        features: ['Create online albums with your works', 'Be discovered by curators and galleries', 'Participate in exhibitions and events', 'Build a community around your art'],
    },
    {
        icon: Users,
        title: 'For Curators',
        description: 'Organize exhibitions with ease',
        color: 'purple',
        features: ['Search artists by style and medium', 'Rent galleries with one click', 'Announce exhibitions and manage participants', 'Build a follower base'],
    },
    {
        icon: Building2,
        title: 'For Galleries',
        description: 'Maximize space utilization',
        color: 'orange',
        features: ['List available spaces', 'Receive rental requests instantly', 'Manage exhibition calendar', 'Connect with curators and artists'],
    },
    {
        icon: Eye,
        title: 'For Visitors',
        description: 'Discover art around you',
        color: 'green',
        features: ['Explore exhibitions and events', 'Discover new artists and works', 'Follow favorite galleries and artists', 'Stay up to date with the art scene'],
    },
];

const colorMap = {
    blue: {
        icon: 'bg-blue-600',
        text: 'text-blue-600',
    },
    purple: {
        icon: 'bg-purple-600',
        text: 'text-purple-600',
    },
    orange: {
        icon: 'bg-orange-600',
        text: 'text-orange-600',
    },
    green: {
        icon: 'bg-green-600',
        text: 'text-green-600',
    },
};

export function RolesSection() {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold">For The Entire Community</h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400">Whatever your role, ArtHive offers the right tools for you</p>
            </div>

            <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
                {roles.map((role) => {
                    const Icon = role.icon;
                    const colors = colorMap[role.color as keyof typeof colorMap];

                    return (
                        <div key={role.title} className="flex flex-col rounded-xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                            <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-lg ${colors.icon}`}>
                                <Icon className="h-8 w-8 text-white" strokeWidth={2} />
                            </div>

                            <h3 className="mb-2 text-xl font-semibold">{role.title}</h3>
                            <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">{role.description}</p>

                            <ul className="space-y-3">
                                {role.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2">
                                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${colors.text}`} strokeWidth={3} />
                                        <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
