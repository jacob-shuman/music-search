import { MusicArtistQuery, MusicAlbumQuery, MusicSongQuery } from "./query";
import { MusicResult } from "./result";
export declare function searchArtist(options: MusicArtistQuery): Promise<MusicResult[]>;
export declare function searchAlbum(options: MusicAlbumQuery): Promise<MusicResult[]>;
export declare function searchSong(options: MusicSongQuery): Promise<MusicResult[]>;
