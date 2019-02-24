import { MusicSource } from "./sources/source";
export interface MusicArtist {
    id: number;
    name: string;
    artUrl?: string;
}
export interface MusicAlbum {
    id: number;
    name: string;
    trackCount?: number;
    artUrl?: string;
    artistId?: number;
}
export interface MusicSong {
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
    sources?: MusicSource[];
    artistSourceLimit?: number;
    albumSourceLimit?: number;
    songSourceLimit?: number;
}
export interface MusicArtistQuery extends MusicQuery {
    artistSearchLimit?: number;
    albumSearchLimit?: number;
    songSearchLimit?: number;
}
export interface MusicAlbumQuery extends MusicQuery {
    albumSearchLimit?: number;
    songSearchLimit?: number;
}
export interface MusicSongQuery extends MusicQuery {
    songSearchLimit?: number;
}
export declare class MusicResult {
    readonly artists: MusicArtist[];
    readonly albums: MusicAlbum[];
    readonly songs: MusicSong[];
    readonly source?: MusicSource;
    constructor(options: {
        artists?: MusicArtist[];
        albums?: MusicAlbum[];
        songs?: MusicSong[];
        source?: MusicSource;
    });
    getArtist(id: number): MusicArtist | undefined;
    getArtistAlbums(id: number): MusicAlbum[];
    getArtistSongs(id: number): MusicSong[];
    getAlbum(id: number): MusicAlbum | undefined;
    getAlbumSongs(id: number): MusicSong[];
    getSong(id: number): MusicSong | undefined;
}
