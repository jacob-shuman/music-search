import { Source } from "./sources/source";
import { SourceResult, MusicResult } from "./result";
export declare class MusicSearchOptions {
    query: string;
    sources: Array<Source>;
    artistLimit?: number;
    albumLimit?: number;
    songLimit?: number;
    constructor(options: {
        query: string;
        sources?: Array<Source>;
        artistLimit?: number;
        albumLimit?: number;
        songLimit?: number;
    });
}
export declare class MusicSearch {
    static options?: MusicSearchOptions;
    static getArtist(options: MusicSearchOptions): Promise<Array<SourceResult<MusicResult>>>;
    static getAlbum(options: MusicSearchOptions): Promise<Array<SourceResult<MusicResult>>>;
    static getSong(options: MusicSearchOptions): Promise<Array<SourceResult<MusicResult>>>;
}
