import { Source } from "./sources/source";
import { Artist, Album, Song } from "./music/music";
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
export declare class MusicResult {
    readonly artists: Array<Artist>;
    readonly albums: Array<Album>;
    readonly songs: Array<Song>;
    constructor(options: {
        artists?: Array<Artist>;
        albums?: Array<Album>;
        songs?: Array<Song>;
    });
    getArtist(id: number): Artist | undefined;
    getArtistAlbums(artist: Artist): Array<Album>;
    getArtistSongs(artist: Artist): Array<Song>;
    getAlbum(id: number): Album | undefined;
    getAlbumArtist(id: number): Artist | undefined;
    getAlbumSongs(album: Album): Array<Song>;
    getSong(id: number): Song | undefined;
    getSongArtist(id: number): Artist | undefined;
    getSongAlbum(song: Song): Album | undefined;
}
