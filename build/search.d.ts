import { MusicQuery, MusicResult } from "./music";
export declare namespace MusicSearch {
    const getArtist: (options: MusicQuery) => Promise<MusicResult[]>;
    const getAlbum: (options: MusicQuery) => Promise<MusicResult[]>;
    const getSong: (options: MusicQuery) => Promise<MusicResult[]>;
}
