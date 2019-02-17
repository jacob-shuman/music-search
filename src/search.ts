import {Source, SourceResult} from "./sources/source";
import {MusicResult} from "./music";

// TODO: Add total artist/album/song limit
export interface MusicSearchOptions {
  // String search query to provide to all sources
  query: string;

  // Lists all sources to be used in search (if none are specified then all default sources will be used)
  sources?: Array<Source>;

  // Sets maximum number of artists per search (NOT TOTAL NUMBER OF ARTISTS)
  artistSourceLimit?: number;

  // Sets maximum number of albums per search (NOT TOTAL NUMBER OF ALBUMS)
  albumSourceLimit?: number;

  // Sets maximum number of songs per search (NOT TOTAL NUMBER OF SONGS)
  songSourceLimit?: number;
}

export namespace MusicSearch {
  export const getArtist = async (
    options: MusicSearchOptions
  ): Promise<Array<SourceResult<MusicResult>>> => {
    let results: Array<SourceResult<MusicResult>> = [];

    // TODO: Set [options.sources] to default sources
    if (!options.sources) options.sources = [];

    for (let index = 0; index < options.sources.length; index++)
      results.push(await options.sources[index].getArtist(options));

    return results;
  };

  export const getAlbum = async (
    options: MusicSearchOptions
  ): Promise<Array<SourceResult<MusicResult>>> => {
    let results: Array<SourceResult<MusicResult>> = [];

    // TODO: Set [options.sources] to default sources
    if (!options.sources) options.sources = [];

    for (let index = 0; index < options.sources.length; index++)
      results.push(await options.sources[index].getAlbum(options));

    return results;
  };

  export const getSong = async (
    options: MusicSearchOptions
  ): Promise<Array<SourceResult<MusicResult>>> => {
    let results: Array<SourceResult<MusicResult>> = [];

    // TODO: Set [options.sources] to default sources
    if (!options.sources) options.sources = [];

    for (let index = 0; index < options.sources.length; index++)
      results.push(await options.sources[index].getSong(options));

    return results;
  };
}
