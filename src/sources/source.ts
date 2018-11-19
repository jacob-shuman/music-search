import { Artist, Album, Song } from "../music";

import { SourceResult, MusicResult } from "../result";

// Sources
import { ItunesSearchSource } from "./itunes-search";
import { MusicSearchOptions } from "../search";

export interface Source {
  // Name of source (Ex: "Itunes", "Sportify", "Last.FM")
  name: string;

  getArtist: (
    options: MusicSearchOptions
  ) => Promise<SourceResult<MusicResult>>;
  getAlbum: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
  getSong: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
}
