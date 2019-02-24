import { MusicArtistQuery, MusicAlbumQuery, MusicSongQuery, MusicResult } from "./music";
export declare function searchArtist(options: MusicArtistQuery): Promise<MusicResult[]>;
export declare function searchAlbum(options: MusicAlbumQuery): Promise<MusicResult[]>;
export declare function searchSong(options: MusicSongQuery): Promise<MusicResult[]>;
