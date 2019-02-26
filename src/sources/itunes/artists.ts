import Itunes from "node-itunes-search";

import {MusicArtist, MusicAlbum, MusicSong} from "../../music";
import {MusicArtistQuery} from "../../query";
import {MusicResult} from "../../result";
import {ItunesSearchSource} from "./itunesSource";

import {getAlbumSongs} from "./albums";

export async function getArtistAlbums(
  artistId: number,
  albumLimit?: number
): Promise<MusicAlbum[]> {
  const artistAlbums: MusicAlbum[] = [];

  const albumSearch: Itunes.Properties[] = (await Itunes.lookup({
    keys: [artistId.toString()],
    keyType: Itunes.LookupType.ID,
    entity: Itunes.Entity.Music.Album,
    limit: albumLimit
  })).results.filter((prop: Itunes.Properties) => {
    return prop.collectionId && prop.collectionName;
  });

  for (let album of albumSearch) {
    // Parsing basic album properties
    const currentAlbum: MusicAlbum = {
      id: album.collectionId!,
      name: album.collectionName,
      trackCount: album.trackCount,
      artistId: artistId
    };

    artistAlbums.push(currentAlbum);
  }

  return artistAlbums;
}

export async function getArtistSongs(artistId: number, songLimit?: number): Promise<MusicSong[]> {
  const artistSongs: MusicSong[] = [];

  const songResults: Itunes.Result = await Itunes.lookup({
    keys: [artistId.toString()],
    keyType: Itunes.LookupType.ID,
    entity: Itunes.Entity.Music.Song,
    limit: songLimit
  });

  // First index is always the artist, the remaining are songs of that collection
  for (let index = 1; index < songResults.resultCount; ++index) {
    const songResult: Itunes.Properties = songResults.results[index];

    const currentSong: MusicSong = {
      id: songResult.trackId || -1,
      name: songResult.trackName || "",
      duration: songResult.trackTimeMillis,
      genre: songResult.primaryGenreName,
      track: songResult.trackNumber,
      artistId: artistId
    };

    artistSongs.push(currentSong);
  }

  return artistSongs;
}

export async function getArtist(options: MusicArtistQuery): Promise<MusicResult> {
  let artistResult: MusicResult = new MusicResult({
    source: new ItunesSearchSource(),
    artists: [],
    albums: [],
    songs: []
  });

  // Array of [ItunesProperties] matches
  // This filters out any results without the required properties
  const artistSearch: Itunes.Properties[] = (await Itunes.search({
    term: options.query,
    entity: Itunes.Entity.Music.MusicArtist,
    limit: options.artistLimit
  })).results.filter((prop: Itunes.Properties) => {
    return prop.artistId && prop.artistName;
  });

  for (let artist of artistSearch) {
    // Parsing basic artist properties
    const currentArist: MusicArtist = {
      id: artist.artistId!,
      name: artist.artistName!
    };

    let artistAlbums: MusicAlbum[] | undefined = undefined;
    let artistSongs: MusicSong[] | undefined = undefined;

    // Retrieve artist albums
    if (options.includeAlbums)
      artistAlbums = await getArtistAlbums(currentArist.id, options.albumLimit);

    if (options.includeSongs && artistAlbums) {
      // Get artist songs based on retrieved albums
      artistSongs = [];

      // Retrieve artist songs based on albums
      for (let album of artistAlbums)
        artistSongs = artistSongs.concat(
          await getAlbumSongs(album.id, options.albumLimit, currentArist.id)
        );
    } else if (options.includeSongs) {
      // Get an assortment of artist songs
      // This will more likely return results that are much more randomized since album is irrelevant
      artistSongs = await getArtistSongs(currentArist.id, options.songLimit);
    }

    // Add all found albums to [artistResult]'s [albums] array
    if (artistAlbums) for (let album of artistAlbums) artistResult.albums.push(album);

    // Add all found songs to [artistResult]'s [songs] array
    if (artistSongs) for (let song of artistSongs) artistResult.songs.push(song);

    artistResult.artists.push(currentArist);
  }

  return artistResult;
}

export async function getArtistById(id: number): Promise<MusicArtist | undefined> {
  const artists: Itunes.Result = await Itunes.lookup({
    keyType: Itunes.LookupType.ID,
    keys: [id.toString()],
    entity: Itunes.Entity.Music.MusicArtist,
    limit: 1
  });

  const artist: Itunes.Properties | undefined =
    artists.resultCount > 0 ? artists.results[0] : undefined;

  return artist && artist.artistId && artist.artistName
    ? {
        id: artist.artistId,
        name: artist.artistName
      }
    : undefined;
}
