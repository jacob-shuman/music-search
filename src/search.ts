import {MusicQuery, MusicResult} from "./music";

export async function searchArtist(options: MusicQuery): Promise<MusicResult[]> {
  let results: MusicResult[] = [];

  // TODO: Set [options.sources] to default sources
  if (!options.sources) options.sources = [];

  // for (let index = 0; index < options.sources.length; index++)
  // results.push(await options.sources[index].getArtist(options));

  for (let source of options.sources) results.push(await source.getArtist(options));
  return results;
}

export async function searchAlbum(options: MusicQuery): Promise<MusicResult[]> {
  let results: MusicResult[] = [];

  // TODO: Set [options.sources] to default sources
  if (!options.sources) options.sources = [];

  for (let index = 0; index < options.sources.length; index++)
    results.push(await options.sources[index].getAlbum(options));

  return results;
}

export async function searchSong(options: MusicQuery): Promise<MusicResult[]> {
  let results: MusicResult[] = [];

  // TODO: Set [options.sources] to default sources
  if (!options.sources) options.sources = [];

  for (let index = 0; index < options.sources.length; index++)
    results.push(await options.sources[index].getSong(options));

  return results;
}
