import { Source } from "./sources/source";
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
export interface MusicQuery {
    query: string;
    sources?: Source[];
    artistSourceLimit?: number;
    albumSourceLimit?: number;
    songSourceLimit?: number;
}
export interface ArtistMusicQuery extends MusicQuery {
    artistSearchLimit?: number;
    albumSearchLimit?: number;
    songSearchLimit?: number;
}
export interface AlbumMusicQuery extends MusicQuery {
    albumSearchLimit?: number;
    songSearchLimit?: number;
}
export interface SongMusicQuery extends MusicQuery {
    songSearchLimit?: number;
}
export declare class MusicResult {
    readonly source?: Source;
    readonly artists: Array<Artist>;
    readonly albums: Array<Album>;
    readonly songs: Array<Song>;
    constructor(options: {
        source?: Source;
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
