import { Source } from "./sources/source";
import { SourceResult, MusicResult } from "./result";
import { Artist, Album, Song } from "./music";

export class MusicSearchOptions {
  // String search query to provide to all sources
  query: string;

  // Lists all sources to be used in search (if none are specified then all default sources will be used)
  sources: Array<Source>;

  // Sets maximum number of artists per search (NOT TOTAL NUMBER OF ARTITS)
  artistLimit?: number;

  // Sets maximum number of albums per search (NOT TOTAL NUMBER OF ALBUMS)
  albumLimit?: number;

  // Sets maximum number of songs per search (NOT TOTAL NUMBER OF SONGS)
  songLimit?: number;

  constructor(options: {
    query: string;
    sources?: Array<Source>;
    artistLimit?: number;
    albumLimit?: number;
    songLimit?: number;
  }) {
    // this.sources = options.sources || Sources.values;
    this.query = options.query;
    this.sources = options.sources || [];
    this.artistLimit = options.artistLimit;
    this.albumLimit = options.albumLimit;
    this.songLimit = options.songLimit;
  }
}

export class MusicSearch {
  static options?: MusicSearchOptions;

  static getArtist(
    options: MusicSearchOptions
  ): Promise<Array<SourceResult<MusicResult>>> {
    return new Promise(async (resolve, reject) => {
      let searchOptions: MusicSearchOptions = options || this.options;
      let results: Array<SourceResult<MusicResult>> = [];

      for (let index = 0; index < searchOptions.sources.length; index++)
        results.push(
          await searchOptions.sources[index].getArtist(searchOptions)
        );

      resolve(results);
    });
  }

  static getAlbum(
    options: MusicSearchOptions
  ): Promise<Array<SourceResult<MusicResult>>> {
    return new Promise(async (resolve, Album) => {
      let searchOptions: MusicSearchOptions = options || this.options;
      let results: Array<SourceResult<MusicResult>> = [];

      for (let index = 0; index < searchOptions.sources.length; index++)
        results.push(
          await searchOptions.sources[index].getAlbum(searchOptions)
        );

      resolve(results);
    });
  }

  static getSong(
    options: MusicSearchOptions
  ): Promise<Array<SourceResult<MusicResult>>> {
    return new Promise(async (resolve, reject) => {
      let searchOptions: MusicSearchOptions = options || this.options;
      let results: Array<SourceResult<MusicResult>> = [];

      for (let index = 0; index < searchOptions.sources.length; index++)
        results.push(await searchOptions.sources[index].getSong(searchOptions));

      resolve(results);
    });
  }
}
