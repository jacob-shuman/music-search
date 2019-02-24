import { MusicArtistQuery, MusicAlbumQuery, MusicSongQuery } from "../query";
import { MusicResult } from "../result";
import { ItunesSearchSource } from "./itunes/itunesSource";
export declare namespace MusicSources {
    type ITUNES_SEARCH = ItunesSearchSource;
}
export interface MusicSource {
    name: string;
    getArtist: (options: MusicArtistQuery) => Promise<MusicResult>;
    getAlbum: (options: MusicAlbumQuery) => Promise<MusicResult>;
    getSong: (options: MusicSongQuery) => Promise<MusicResult>;
}
