import {MusicArtistQuery, MusicAlbumQuery, MusicSongQuery} from "../query";
import {MusicResult} from "../result";

// Sources
import {ItunesSearchSource} from "./itunes/itunesSource";

export namespace MusicSources {
  // export const ITUNES_SEARCH: ItunesSearchSource = new ItunesSearchSource();
  export type ITUNES_SEARCH = ItunesSearchSource;
}

export interface MusicSource {
  // Name of source (Ex: "Itunes", "Spotify", "Last.FM")
  name: string;

  getArtist: (options: MusicArtistQuery) => Promise<MusicResult>;
  getAlbum: (options: MusicAlbumQuery) => Promise<MusicResult>;
  getSong: (options: MusicSongQuery) => Promise<MusicResult>;
}
