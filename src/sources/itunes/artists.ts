import Itunes from "node-itunes-search";

import {Artist, Album, Song, MusicResult} from "../../music";
import {SourceResult} from "../source";
import {MusicSearchOptions} from "../../search";
import {ItunesSearchSource} from "./itunesSource";

export async function getArtist(options: MusicSearchOptions): Promise<SourceResult<MusicResult>> {
  const artists = Array<Artist>();
  const albums = Array<Album>();
  const songs = Array<Song>();

  const itunesArtists: Itunes.Result = await Itunes.search({
    term: options.query,
    entity: Itunes.Entity.Music.MusicArtist,
    limit: options.artistSourceLimit
  });

  for (let artistResult of itunesArtists.results) {
    if (artistResult.artistId && artistResult.artistName) {
      artists.push({
        id: artistResult.artistId,
        name: artistResult.artistName
      });

      const itunesAlbums: Itunes.Result = await Itunes.lookup({
        keys: [artistResult.artistId.toString()],
        keyType: Itunes.LookupType.ID,
        entity: Itunes.Entity.Music.Album,
        limit: options.albumSourceLimit
      });

      for (let albumResult of itunesAlbums.results) {
        if (albumResult.collectionId) {
          albums.push({
            id: albumResult.collectionId,
            name: albumResult.collectionName,
            trackCount: albumResult.trackCount,
            artistId: artistResult.artistId
          });

          const itunesSongs = await Itunes.lookup({
            keys: [albumResult.collectionId.toString()],
            keyType: Itunes.LookupType.ID,
            entity: Itunes.Entity.Music.Song,
            limit: options.albumSourceLimit
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
              artistId: artistResult.artistId,
              albumId: albumResult.collectionId
            });
          }
        }
      }
    }
  }

  return new SourceResult({
    result: new MusicResult({
      artists: artists,
      albums: albums,
      songs: songs
    }),
    source: new ItunesSearchSource()
  });
}

export async function getArtistById(id: number): Promise<Artist | undefined> {
  const artists = await Itunes.lookup({
    keyType: Itunes.LookupType.ID,
    keys: [id.toString()],
    entity: Itunes.Entity.Music.MusicArtist,
    limit: 1
  });

  const artist: Itunes.Properties | undefined =
    artists.resultCount > 0 ? artists.results[0] : undefined;

  if (artist && artist.artistId && artist.artistName)
    return {
      id: artist.artistId,
      name: artist.artistName
    };
  else return undefined;
}
