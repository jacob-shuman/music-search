import { Artist, Album } from "../music";
import { Source } from "./source";
import { SourceResult, MusicResult } from "../result";
import { MusicSearchOptions } from "../search";
export declare class ItunesSearchSource implements Source {
    name: string;
    getArtist(options: MusicSearchOptions): Promise<SourceResult<MusicResult>>;
    getArtistById(id: number): Promise<Artist | undefined>;
    getAlbum(options: MusicSearchOptions): Promise<SourceResult<MusicResult>>;
    getAlbumById(id: number): Promise<Album | undefined>;
    getSong(options: MusicSearchOptions): Promise<SourceResult<MusicResult>>;
}
