import { Source, SourceResult } from "./sources/source";
import { MusicResult } from "./music";
export interface MusicSearchOptions {
    query: string;
    sources?: Array<Source>;
    artistSourceLimit?: number;
    albumSourceLimit?: number;
    songSourceLimit?: number;
}
export declare namespace MusicSearch {
    const getArtist: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>[]>;
    const getAlbum: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>[]>;
    const getSong: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>[]>;
}
