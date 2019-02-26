import {searchArtist, searchAlbum, searchSong} from "./search";

import {MusicSource, MusicSources} from "./sources/source";

import {MusicArtist, MusicAlbum, MusicSong} from "./music";

import {MusicQuery, MusicArtistQuery, MusicAlbumQuery, MusicSongQuery} from "./query";

import {MusicResult} from "./result";

export {searchArtist, searchAlbum, searchSong} from "./search";

export {MusicSource, MusicSources} from "./sources/source";
export {ItunesSearchSource} from "./sources/itunes/itunesSource";

export {MusicArtist, MusicAlbum, MusicSong} from "./music";

export {MusicQuery, MusicArtistQuery, MusicAlbumQuery, MusicSongQuery} from "./query";

export {MusicResult} from "./result";

export namespace MusicSearch {
  // Interfaces
  export type Artist = MusicArtist;
  export type Album = MusicAlbum;
  export type Song = MusicSong;

  export type Source = MusicSource;

  export type Query = MusicQuery;
  export type ArtistQuery = MusicArtistQuery;
  export type AlbumQuery = MusicAlbumQuery;
  export type SongQuery = MusicSongQuery;

  // Namespaces
  export import Sources = MusicSources;

  // Classes
  export type Result = MusicResult;

  // Functions
  export const getArtist = searchArtist;
  export const getAlbum = searchAlbum;
  export const getSong = searchSong;
}

export default MusicSearch;
