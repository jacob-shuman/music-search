import Itunes from "node-itunes-search";

import {Artist, Album, Song, MusicResult} from "../../music";
import {SourceResult} from "../source";
import {MusicSearchOptions} from "../../search";
import {ItunesSearchSource} from "./itunesSource";

import {getArtistById} from "./artists";

export async function getAlbum(options: MusicSearchOptions): Promise<SourceResult<MusicResult>> {
  const artists = Array<Artist>();
  const albums = Array<Album>();
  const songs = Array<Song>();

  const itunesAlbums = (await Itunes.search({
    term: options.query,
    entity: Itunes.Entity.Music.Album,
    limit: options.albumSourceLimit
  })).results.filter((prop: Itunes.Properties) => {
    return prop.collectionId && prop.collectionName;
  });

  // Lookup all songs with found album (collection) id
  for (let albumResult of itunesAlbums) {
    const album: Album = {
      id: albumResult.collectionId!,
      name: albumResult.collectionName,
      trackCount: albumResult.trackCount
    };

    // TODO work with song.artistId directly
    // Find song artist
    // Assign possibly already existant artist
    let artistResult = artists.find((artist: Artist) => artist.id == albumResult.artistId);

    // If it's a new artist then asynchronously retrieve it
    if (!artistResult && albumResult.artistId)
      artistResult = await getArtistById(albumResult.artistId);

    if (artistResult) {
      album.artistId = artistResult.id;

      // Check if artist with id already exists
      if (!artists.some((artist: Artist) => artistResult!.id == artist.id))
        artists.push(artistResult);
    }

    const itunesSongs = await Itunes.lookup({
      keys: [albumResult.collectionId!.toString()],
      keyType: Itunes.LookupType.ID,
      entity: Itunes.Entity.Music.Song,
      limit: options.songSourceLimit
    });

    // First index is always the collection, the remaining are songs of that collection
    for (let index = 1; index < itunesSongs.resultCount; ++index) {
      const song = itunesSongs.results[index];

      //TODO filter out invalid songs prior
      songs.push({
        id: song.trackId || -1,
        name: song.trackName || "",
        duration: song.trackTimeMillis,
        genre: song.primaryGenreName,
        track: song.trackNumber,
        artistId: albumResult.artistId,
        albumId: albumResult.collectionId
      });
    }

    albums.push(album);
  }

  return new SourceResult<MusicResult>({
    result: new MusicResult({artists: artists, albums: albums, songs: songs}),
    source: new ItunesSearchSource()
  });
}

export async function getAlbumById(id: number): Promise<Album | undefined> {
  const albums = await Itunes.lookup({
    keyType: Itunes.LookupType.ID,
    keys: [id.toString()],
    entity: Itunes.Entity.Music.Album,
    limit: 1
  });

  const album: Itunes.Properties | undefined =
    albums.resultCount > 0 ? albums.results[0] : undefined;

  if (album && album.collectionId && album.collectionName)
    return {
      id: album.collectionId,
      name: album.collectionName,
      artUrl: album.artworkUrl60 ? album.artworkUrl60.replace("60x60", "600x600") : undefined
    };
  else return undefined;
}
