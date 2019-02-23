import { ArtistMusicQuery, AlbumMusicQuery, SongMusicQuery, MusicResult } from "../music";
import { ItunesSearchSource } from "./itunes/itunesSource";
export declare namespace Sources {
    const ITUNES_SEARCH: ItunesSearchSource;
}
export interface Source {
    name: string;
    getArtist: (options: ArtistMusicQuery) => Promise<MusicResult>;
    getAlbum: (options: AlbumMusicQuery) => Promise<MusicResult>;
    getSong: (options: SongMusicQuery) => Promise<MusicResult>;
}
