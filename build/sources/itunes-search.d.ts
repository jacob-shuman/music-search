import { Source } from "./source";
import { SourceResult, MusicResult } from "../result";
import { MusicSearchOptions } from "../search";
export declare class ItunesSearchSource implements Source {
    name: string;
    getArtist: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
    getAlbum: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
    getSong: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
}
