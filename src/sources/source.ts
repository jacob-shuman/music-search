import { Artist } from "../music/artist";
import { Album } from "../music/album";
import { Song } from "../music/song";

import { SourceResult } from "../result";

// Sources
import { ItunesSource } from "./itunes-search";

export interface Source {
  // Name of source (Ex: "Itunes", "Sportify", "Last.FM")
  name: string;

  getArtist: (options: { name: string }) => Promise<SourceResult<Artist>>;
  getAlbum: (options: { name: string }) => Promise<SourceResult<Album>>;
  getSong: (options: { name: string }) => Promise<SourceResult<Song>>;
}

export const metaDataSources: Array<Source> = [new ItunesSource()];
