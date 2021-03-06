import { searchArtist, searchAlbum, searchSong } from "./search";
import { MusicSource, MusicSources } from "./sources/source";
import { MusicArtist, MusicAlbum, MusicSong } from "./music";
import { MusicQuery, MusicArtistQuery, MusicAlbumQuery, MusicSongQuery } from "./query";
import { MusicResult } from "./result";
export { searchArtist, searchAlbum, searchSong } from "./search";
export { MusicSource, MusicSources } from "./sources/source";
export { ItunesSearchSource } from "./sources/itunes/itunesSource";
export { MusicArtist, MusicAlbum, MusicSong } from "./music";
export { MusicQuery, MusicArtistQuery, MusicAlbumQuery, MusicSongQuery } from "./query";
export { MusicResult } from "./result";
export declare namespace MusicSearch {
    type Artist = MusicArtist;
    type Album = MusicAlbum;
    type Song = MusicSong;
    type Source = MusicSource;
    type Query = MusicQuery;
    type ArtistQuery = MusicArtistQuery;
    type AlbumQuery = MusicAlbumQuery;
    type SongQuery = MusicSongQuery;
    export import Sources = MusicSources;
    type Result = MusicResult;
    const getArtist: typeof searchArtist;
    const getAlbum: typeof searchAlbum;
    const getSong: typeof searchSong;
}
export default MusicSearch;
