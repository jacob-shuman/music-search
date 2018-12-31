export interface Artist {
    id: number;
    name: string;
    artUrl?: string;
}
export interface Album {
    id: number;
    name: string;
    trackCount?: number;
    artUrl?: string;
    artistId?: number;
}
export interface Song {
    id: number;
    name: string;
    track?: number;
    duration?: number;
    genre?: string;
    artistId?: number;
    albumId?: number;
}
