import {MusicSources} from "./sources/source";
import {MusicArtistQuery, MusicAlbumQuery, MusicSongQuery} from "./query";
import {MusicResult} from "./result";

export async function searchArtist(options: MusicArtistQuery): Promise<MusicResult[]> {
  let results: MusicResult[] = [];

  for (let source of options.sources) results.push(await source.getArtist(options));
  return results;
}

export async function searchAlbum(options: MusicAlbumQuery): Promise<MusicResult[]> {
  let results: MusicResult[] = [];

  for (let source of options.sources) results.push(await source.getAlbum(options));

  return results;
}

export async function searchSong(options: MusicSongQuery): Promise<MusicResult[]> {
  let results: MusicResult[] = [];

  for (let source of options.sources) results.push(await source.getSong(options));

  return results;
}
