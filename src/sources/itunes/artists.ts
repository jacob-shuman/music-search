import Itunes from "node-itunes-search";

import {Artist, ArtistMusicQuery, MusicResult} from "../../music";
import {ItunesSearchSource} from "./itunesSource";

export async function getArtist(options: ArtistMusicQuery): Promise<MusicResult> {
  let artistResult: MusicResult = new MusicResult({
    source: new ItunesSearchSource(),
    artists: [],
    albums: [],
    songs: []
  });

  const artistSearch: Itunes.Result = await Itunes.search({
    term: options.query,
    entity: Itunes.Entity.Music.MusicArtist,
    limit: options.artistSearchLimit
  });

  for (let artist of artistSearch.results) {
    if (artist.artistId && artist.artistName) {
      artistResult.artists.push({
        id: artist.artistId,
        name: artist.artistName
      });

      const albumSearch: Itunes.Result = await Itunes.lookup({
        keys: [artist.artistId.toString()],
        keyType: Itunes.LookupType.ID,
        entity: Itunes.Entity.Music.Album,
        limit: options.albumSearchLimit
      });

      for (let album of albumSearch.results) {
        if (album.collectionId) {
          artistResult.albums.push({
            id: album.collectionId,
            name: album.collectionName,
            trackCount: album.trackCount,
            artistId: artist.artistId
          });

          const songSearch: Itunes.Result = await Itunes.lookup({
            keys: [album.collectionId.toString()],
            keyType: Itunes.LookupType.ID,
            entity: Itunes.Entity.Music.Song,
            limit: options.songSearchLimit
          });

          // First index is always the collection, the remaining are songs of that collection
          for (let index = 1; index < songSearch.resultCount; ++index) {
            const song: Itunes.Properties = songSearch.results[index];

            //TODO filter out invalid songs prior
            artistResult.songs.push({
              id: song.trackId || -1,
              name: song.trackName || "",
              duration: song.trackTimeMillis,
              genre: song.primaryGenreName,
              track: song.trackNumber,
              artistId: artist.artistId,
              albumId: album.collectionId
            });
          }
        }
      }
    }
  }

  return artistResult;
}

export async function getArtistById(id: number): Promise<Artist | undefined> {
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
