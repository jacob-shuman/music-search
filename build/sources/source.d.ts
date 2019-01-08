import { MusicResult } from "../music";
import { MusicSearchOptions } from "../search";
export interface Source {
    name: string;
    getArtist: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
    getAlbum: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
    getSong: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
}
export declare class SourceResult<T> {
    readonly source: Source;
    readonly result: T;
    readonly success: boolean;
    constructor(options: {
        result: T;
        source: Source;
        success?: boolean;
    });
}
