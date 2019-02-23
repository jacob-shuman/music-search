import {Source} from "./sources/source";
import {MusicQuery, MusicResult} from "./music";

// // TODO: Add total artist/album/song limit
// export interface MusicSearchOptions {
//   // String search query to provide to all sources
//   query: string;

//   // Lists all sources to be used in search (if none are specified then all default sources will be used)
//   sources?: Array<Source>;

//   // Simplify this...
//   // Contextual limit that the function handles.
//   limit?: number;

//   // Sets maximum number of artists per search (NOT TOTAL NUMBER OF ARTISTS)
//   // artistSourceLimit?: number;

//   // // Sets maximum number of albums per search (NOT TOTAL NUMBER OF ALBUMS)
//   // albumSourceLimit?: number;

//   // // Sets maximum number of songs per search (NOT TOTAL NUMBER OF SONGS)
//   // songSourceLimit?: number;
// }

// export namespace MusicSearch {
//   export const getArtist = async (
//     options: MusicSearchOptions
//   ): Promise<Array<SourceResult<MusicResult>>> => {
//     let results: Array<SourceResult<MusicResult>> = [];

//     // TODO: Set [options.sources] to default sources
//     if (!options.sources) options.sources = [];

//     for (let index = 0; index < options.sources.length; index++)
//       results.push(await options.sources[index].getArtist(options));

//     return results;
//   };

//   export const getAlbum = async (
//     options: MusicSearchOptions
//   ): Promise<Array<SourceResult<MusicResult>>> => {
//     let results: Array<SourceResult<MusicResult>> = [];

//     // TODO: Set [options.sources] to default sources
//     if (!options.sources) options.sources = [];

//     for (let index = 0; index < options.sources.length; index++)
//       results.push(await options.sources[index].getAlbum(options));

//     return results;
//   };

//   export const getSong = async (
//     options: MusicSearchOptions
//   ): Promise<Array<SourceResult<MusicResult>>> => {
//     let results: Array<SourceResult<MusicResult>> = [];

//     // TODO: Set [options.sources] to default sources
//     if (!options.sources) options.sources = [];

//     for (let index = 0; index < options.sources.length; index++)
//       results.push(await options.sources[index].getSong(options));

//     return results;
//   };
// }

export namespace MusicSearch {
  export const getArtist = async (options: MusicQuery): Promise<MusicResult[]> => {
    let results: MusicResult[] = [];

    // TODO: Set [options.sources] to default sources
    if (!options.sources) options.sources = [];

    // for (let index = 0; index < options.sources.length; index++)
    // results.push(await options.sources[index].getArtist(options));

    for (let source of options.sources)
    results.push(await source.getArtist(options));
    return results;
  };

  export const getAlbum = async (options: MusicQuery): Promise<MusicResult[]> => {
    let results: MusicResult[] = [];

    // TODO: Set [options.sources] to default sources
    if (!options.sources) options.sources = [];

    for (let index = 0; index < options.sources.length; index++)
      results.push(await options.sources[index].getAlbum(options));

    return results;
  };

  export const getSong = async (options: MusicQuery): Promise<MusicResult[]> => {
    let results: MusicResult[] = [];

    // TODO: Set [options.sources] to default sources
    if (!options.sources) options.sources = [];

    for (let index = 0; index < options.sources.length; index++)
      results.push(await options.sources[index].getSong(options));

    return results;
  };
}
