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
export declare class MusicResult {
    readonly artists: Array<Artist>;
    readonly albums: Array<Album>;
    readonly songs: Array<Song>;
    constructor(options: {
        artists?: Array<Artist>;
        albums?: Array<Album>;
        songs?: Array<Song>;
    });
    getArtist(id: number): Artist | undefined;
    getArtistAlbums(id: number): Array<Album>;
    getArtistSongs(id: number): Array<Song>;
    getAlbum(id: number): Album | undefined;
    getAlbumSongs(id: number): Array<Song>;
    getSong(id: number): Song | undefined;
}
