import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Artist } from '@/types/models';

interface ArtistCardProps {
    artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
    const artworks = artist.albums?.flatMap((album) => album.artworks || []).slice(0, 4) || [];

    return (
        <motion.div whileHover={{ y: -8, transition: { duration: 0.2 } }}>
            <Card className="group h-full overflow-hidden border-2 transition-all hover:shadow-xl">
                <CardHeader className="space-y-4">
                    <div className="flex items-start gap-4">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-zinc-200 dark:ring-zinc-800">
                            <img src={artist.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.user.name)}&size=200`} alt={artist.user.name} className="h-full w-full object-cover" loading="lazy" />
                        </motion.div>
                        <div className="flex-1 space-y-1">
                            <CardTitle className="text-xl">{artist.user.name}</CardTitle>
                            <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300">{artist.specialization}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{artist.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{artist.followers_count.toLocaleString()}</span>
                        </div>
                    </div>

                    {artist.user.bio && <CardDescription className="line-clamp-2">{artist.user.bio}</CardDescription>}
                </CardHeader>

                {artworks.length > 0 && (
                    <CardContent>
                        <div className="mb-4 grid grid-cols-2 gap-2">
                            {artworks.map((artwork) => (
                                <motion.div key={artwork.id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                    <img src={artwork.image_path} alt={artwork.title} className="h-full w-full object-cover" loading="lazy" />
                                </motion.div>
                            ))}
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button variant="outline" className="w-full">
                                View Profile
                            </Button>
                        </motion.div>
                    </CardContent>
                )}
            </Card>
        </motion.div>
    );
}
