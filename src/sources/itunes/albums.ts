import Itunes from "node-itunes-search";

import {MusicArtist, MusicAlbum, MusicSong} from "../../music";
import {MusicAlbumQuery} from "../../query";
import {MusicResult} from "../../result";
import {ItunesSearchSource} from "./itunesSource";

import {getArtistById} from "./artists";

export async function getAlbumArtist(
  artistId: number,
  artists: MusicArtist[]
): Promise<MusicArtist | undefined> {
  let artistResult: MusicArtist | undefined = undefined;

  // Assign possibly already existing artist
  artistResult = artists.find((currentArtist: MusicArtist) => currentArtist.id == artistId);

  // If it's a new artist then asynchronously retrieve it
  if (!artistResult && artistId) artistResult = await getArtistById(artistId);

  return artistResult;
}

export async function getAlbumSongs(
  albumId: number,
  songLimit?: number,
  artistId?: number
): Promise<MusicSong[]> {
  const albumSongs: MusicSong[] = [];

  const songResults: Itunes.Result = await Itunes.lookup({
    keys: [albumId.toString()],
    keyType: Itunes.LookupType.ID,
    entity: Itunes.Entity.Music.Song,
    limit: songLimit
  });

  // First index is always the collection, the remaining are songs of that collection
  for (let index = 1; index < songResults.resultCount; ++index) {
    const songResult: Itunes.Properties = songResults.results[index];

    const currentSong: MusicSong = {
      id: songResult.trackId || -1,
      name: songResult.trackName || "",
      duration: songResult.trackTimeMillis,
      genre: songResult.primaryGenreName,
      track: songResult.trackNumber,
      albumId: albumId
    };

    // Apply the [artistId] if defined
    if (artistId) currentSong.artistId;

    albumSongs.push(currentSong);
  }

  return albumSongs;
}

export async function getAlbum(options: MusicAlbumQuery): Promise<MusicResult> {
  const albumResult: MusicResult = new MusicResult({
    source: new ItunesSearchSource(),
    artists: [],
    albums: [],
    songs: []
  });

  // Array of [ItunesProperties] matches
  // This filters out any results without the required properties
  const albumSearch: Itunes.Properties[] = (await Itunes.search({
    term: options.query,
    entity: Itunes.Entity.Music.Album,
    limit: options.albumLimit
  })).results.filter((prop: Itunes.Properties) => {
    return prop.collectionId && prop.collectionName;
  });

  for (let album of albumSearch) {
    // Parsing basic album properties
    const currentAlbum: MusicAlbum = {
      id: album.collectionId!,
      name: album.collectionName,
      trackCount: album.trackCount
    };

    let albumArtist: MusicArtist | undefined = undefined;
    let albumSongs: MusicSong[] | undefined = undefined;

    // Find album artist
    if (options.includeArtist && album.artistId) {
      albumArtist = await getAlbumArtist(album.artistId, albumResult.artists);

      if (albumArtist) {
        // Apply found album artist to [currentAlbum]
        currentAlbum.artistId = albumArtist.id;

        // If the found artist doesn't exist in [albumResult]'s [artists] array then push it
        if (albumResult.getArtist(albumArtist.id) == undefined)
          albumResult.artists.push(albumArtist);
      }
    }

    // Find album songs
    if (options.includeSongs) {
      albumSongs = await getAlbumSongs(
        currentAlbum.id,
        options.songLimit,
        albumArtist ? albumArtist.id : undefined
      );

      // Append all songs to [albumResult]'s [songs] array
      if (albumSongs) for (let song of albumSongs) albumResult.songs.push(song);
    }

    albumResult.albums.push(currentAlbum);
  }

  return albumResult;
}

export async function getAlbumById(id: number): Promise<MusicAlbum | undefined> {
  const albumResults: Itunes.Result = await Itunes.lookup({
    keyType: Itunes.LookupType.ID,
    keys: [id.toString()],
    entity: Itunes.Entity.Music.Album,
    limit: 1
  });

  const album: Itunes.Properties | undefined =
    albumResults.resultCount > 0 ? albumResults.results[0] : undefined;

  return album && album.collectionId && album.collectionName
    ? {
        id: album.collectionId,
        name: album.collectionName,
        artUrl: album.artworkUrl60 ? album.artworkUrl60.replace("60x60", "600x600") : undefined
      }
    : undefined;
}
