export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: 'curator' | 'artist' | 'gallery' | 'user';
    bio?: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface Artist {
    id: number;
    user_id: number;
    user: User;
    specialization: string;
    location: string;
    views: number;
    followers_count: number;
    albums?: Album[];
    created_at: string;
    updated_at: string;
}

export interface Album {
    id: number;
    artist_id: number;
    title: string;
    description?: string;
    views: number;
    artworks?: Artwork[];
    created_at: string;
    updated_at: string;
}

export interface Artwork {
    id: number;
    album_id: number;
    title: string;
    medium: string;
    year?: number;
    image_path: string;
    description?: string;
    views: number;
    created_at: string;
    updated_at: string;
}

export interface Gallery {
    id: number;
    user_id: number;
    user: User;
    name: string;
    description?: string;
    location: string;
    rating?: number;
    followers_count: number;
    spaces?: Space[];
    created_at: string;
    updated_at: string;
}

export interface Space {
    id: number;
    gallery_id: number;
    name: string;
    description?: string;
    size_sqm: number;
    price: number;
    available: boolean;
    facilities?: string[];
    images?: SpaceImage[];
    created_at: string;
    updated_at: string;
}

export interface SpaceImage {
    id: number;
    space_id: number;
    image_path: string;
    created_at: string;
    updated_at: string;
}

export interface Curator {
    id: number;
    user_id: number;
    user: User;
    experience?: string;
    location: string;
    exhibitions_count: number;
    followers_count: number;
    exhibitions?: Exhibition[];
    created_at: string;
    updated_at: string;
}

export interface Exhibition {
    id: number;
    curator_id: number;
    space_id?: number;
    curator: Curator;
    space?: Space;
    title: string;
    slug: string;
    description?: string;
    start_date: string;
    end_date: string;
    cover_image?: string;
    status: string;
    views: number;
    artists?: Artist[];
    artworks?: Artwork[];
    created_at: string;
    updated_at: string;
}

export interface Activity {
    id: number;
    user_id: number;
    type: string;
    data?: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface Follow {
    id: number;
    follower_id: number;
    following_id: number;
    following_type: string;
    created_at: string;
    updated_at: string;
}

export type SearchResultType = 'artist' | 'curator' | 'gallery';

export interface SearchResultItem {
    id: number;
    type: SearchResultType;
    name: string;
    avatar?: string;
    subtitle: string;
    location: string;
    followers_count: number;
}

export interface SearchResults {
    artists: SearchResultItem[];
    curators: SearchResultItem[];
    galleries: SearchResultItem[];
}
