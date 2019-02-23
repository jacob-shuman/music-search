import {ArtistMusicQuery, AlbumMusicQuery, SongMusicQuery, MusicResult} from "../music";

// Sources
import {ItunesSearchSource} from "./itunes/itunesSource";

export namespace Sources {
  export const ITUNES_SEARCH: ItunesSearchSource = new ItunesSearchSource();
}

export interface Source {
  // Name of source (Ex: "Itunes", "Spotify", "Last.FM")
  name: string;

  getArtist: (options: ArtistMusicQuery) => Promise<MusicResult>;
  getAlbum: (options: AlbumMusicQuery) => Promise<MusicResult>;
  getSong: (options: SongMusicQuery) => Promise<MusicResult>;
}
