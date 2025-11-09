export interface Auth {
    user: User | null;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

// Artists
export interface Artist {
    id: number;
    specialization: string | null;
    location: string | null;
    views: number;
    followers_count: number;
    user: User;
    albums?: Album[];
    albums_count?: number;
    artworks_count?: number;
    exhibitions?: Exhibition[];
    exhibitions_count?: number;
    stats?: ArtistStats;
    is_followed_by_auth?: boolean | null;
}

export interface ArtistStats {
    total_albums: number;
    total_artworks: number;
    total_exhibitions: number;
    followers_count: number;
}

// Curators
export interface Curator {
    id: number;
    experience: string | null;
    location: string | null;
    exhibitions_count: number;
    followers_count: number;
    user: User;
    exhibitions?: Exhibition[];
    active_exhibitions_count?: number;
    stats?: CuratorStats;
    is_followed_by_auth?: boolean | null;
}

export interface CuratorStats {
    total_exhibitions: number;
    active_exhibitions: number;
    past_exhibitions: number;
    followers_count: number;
    total_artists_worked_with: number;
}

// Galleries
export interface Gallery {
    id: number;
    name: string;
    description: string | null;
    location: string;
    rating: string;
    followers_count: number;
    user: User;
    spaces?: Space[];
    spaces_count?: number;
    available_spaces_count?: number;
    stats?: GalleryStats;
    is_followed_by_auth?: boolean | null;
}

export interface GalleryStats {
    total_spaces: number;
    available_spaces: number;
    total_exhibitions_hosted: number;
    rating: string;
    followers_count: number;
}

// Albums & Artworks
export interface Album {
    id: number;
    title: string;
    description: string | null;
    views: number;
    artworks?: Artwork[];
}

export interface Artwork {
    id: number;
    title: string;
    medium: string;
    year: number;
    image_path: string;
    description: string | null;
    views: number;
}

// Exhibitions
export interface Exhibition {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    start_date: string;
    end_date: string;
    status: string;
    cover_image: string | null;
    curator?: {
        id: number;
        user: {
            name: string;
        };
    };
    space?: {
        id?: number;
        name: string;
        gallery: {
            name: string;
            location: string;
        };
    } | null;
    artists_count?: number;
    artworks_count?: number;
}

// Spaces
export interface Space {
    id: number;
    name: string;
    description: string | null;
    size_sqm: number;
    price: string;
    available: boolean;
    facilities: string[];
    images?: SpaceImage[];
    exhibitions_count?: number;
}

export interface SpaceImage {
    id: number;
    image_path: string;
    order: number;
}

// Pagination
export interface PaginatedData<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    };
}
