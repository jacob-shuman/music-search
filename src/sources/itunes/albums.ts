import Itunes from "node-itunes-search";

import {Artist, Album, AlbumMusicQuery, MusicResult} from "../../music";
import {ItunesSearchSource} from "./itunesSource";

import {getArtistById} from "./artists";

export async function getAlbum(options: AlbumMusicQuery): Promise<MusicResult> {
  const albumResult: MusicResult = new MusicResult({
    source: new ItunesSearchSource(),
    artists: [],
    albums: [],
    songs: []
  });

  // Query the iTunes Search API & filter out results without an id or name
  const albumSearch: Itunes.Properties[] = (await Itunes.search({
    term: options.query,
    entity: Itunes.Entity.Music.Album,
    limit: options.albumSearchLimit
  })).results.filter((prop: Itunes.Properties) => {
    return prop.collectionId && prop.collectionName;
  });

  // Lookup all songs with found album (collection) id
  for (let album of albumSearch) {
    // TODO work with song.artistId directly
    // Find song artist
    // Assign possibly already existing artist
    let artistResult: Artist | undefined = albumResult.artists.find(
      (artist: Artist) => artist.id == album.artistId
    );

    // If it's a new artist then asynchronously retrieve it
    if (!artistResult && album.artistId) artistResult = await getArtistById(album.artistId);

    // Check if artist with id already exists
    if (
      artistResult &&
      !albumResult.artists.some((artist: Artist) => artistResult!.id == artist.id)
    )
      albumResult.artists.push(artistResult);

    const songResults: Itunes.Result = await Itunes.lookup({
      keys: [album.collectionId!.toString()],
      keyType: Itunes.LookupType.ID,
      entity: Itunes.Entity.Music.Song,
      limit: options.songSearchLimit
    });

    // First index is always the collection, the remaining are songs of that collection
    for (let index = 1; index < songResults.resultCount; ++index) {
      const song: Itunes.Properties = songResults.results[index];

      //TODO filter out invalid songs prior
      albumResult.songs.push({
        id: song.trackId || -1,
        name: song.trackName || "",
        duration: song.trackTimeMillis,
        genre: song.primaryGenreName,
        track: song.trackNumber,
        artistId: album.artistId,
        albumId: album.collectionId
      });
    }

    albumResult.albums.push({
      id: album.collectionId!,
      name: album.collectionName,
      trackCount: album.trackCount,
      artistId: artistResult ? artistResult.id : undefined
    });
  }

  return albumResult;
}

export async function getAlbumById(id: number): Promise<Album | undefined> {
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
