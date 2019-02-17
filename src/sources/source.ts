import {MusicResult} from "../music";

// Sources
import {MusicSearchOptions} from "../search";
import {ItunesSearchSource} from "./itunes/itunesSource";

export interface Source {
  // Name of source (Ex: "Itunes", "Sportify", "Last.FM")
  name: string;

  getArtist: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
  getAlbum: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
  getSong: (options: MusicSearchOptions) => Promise<SourceResult<MusicResult>>;
}

export class SourceResult<T> {
  // Copy of source used
  readonly source: Source;

  // Result from source
  readonly result: T;

  // Success state of the source action
  readonly success: boolean;

  constructor(options: {result: T; source: Source; success?: boolean}) {
    this.source = options.source;
    this.result = options.result;
    this.success = options.success || false;
  }
}
