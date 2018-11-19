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

// export class Sources {
//   static readonly NONE: Source;
//   static readonly ITUNES_SEARCH: Source = new ItunesSearchSource();
// }

// export const Sources = {
//   // Default/empty source
//   default: new class implements Source {
//     name: string = "Default Source";

//     getArtist = (options: { query: string; limit?: number }) =>
//       new Promise<SourceResult<Artist>>((resolve, reject) => resolve());

//     getAlbum = (options: { query: string; limit?: number }) =>
//       new Promise<SourceResult<Album>>((resolve, reject) => resolve());

//     getSong = (options: { query: string; limit?: number }) =>
//       new Promise<SourceResult<Song>>((resolve, reject) => resolve());
//   }() as Source,

//   // List of default sources
//   values: {
//     ItunesSearch: new ItunesSearchSource() as Source
//   },

//   // Returns all sources (excluding default) as an array
//   get all(): Array<Source> {
//     const sourceList: Array<Source> = [];

//     for (let source in this.values) sourceList.push(this.values[source]);
//     return sourceList;
//   },

//   // Current [size] of [values]
//   get size(): number {
//     return Object.keys(this.values).length;
//   }
// };
