import { Artist, Album, Song } from "../music";

import { Source } from "./source";
import { SourceResult, MusicResult } from "../result";

import {
  searchItunes,
  ItunesSearchOptions,
  ItunesEntityMusic,
  lookupItunes,
  ItunesLookupOptions,
  ItunesLookupType
} from "node-itunes-search";
import { MusicSearchOptions } from "../search";

export class ItunesSearchSource implements Source {
  name = "Itunes";

  getArtist = (options: MusicSearchOptions) =>
    new Promise<SourceResult<MusicResult>>(async (resolve, reject) => {
      const artists = Array<Artist>();
      const albums = Array<Album>();
      const songs = Array<Song>();

      const itunesArtists = await searchItunes(
        new ItunesSearchOptions({
          term: options.query,
          entity: ItunesEntityMusic.MusicArtist,
          limit: options.artistLimit
        })
      );

      for (let artistResult of itunesArtists.results) {
        if (artistResult.artistId) {
          artists.push(
            new Artist({
              id: artistResult.artistId,
              name: artistResult.artistName
            })
          );

          const itunesAlbums = await lookupItunes(
            new ItunesLookupOptions({
              keys: [artistResult.artistId.toString()],
              keyType: ItunesLookupType.ID,
              entity: ItunesEntityMusic.Album,
              limit: options.albumLimit
            })
          );

          for (let albumResult of itunesAlbums.results) {
            if (albumResult.collectionId) {
              albums.push(
                new Album({
                  id: albumResult.collectionId,
                  name: albumResult.collectionName,
                  trackCount: albumResult.trackCount,
                  artistId: artistResult.artistId
                })
              );

              const itunesSongs = await lookupItunes(
                new ItunesLookupOptions({
                  keys: [artistResult.artistId.toString()],
                  keyType: ItunesLookupType.ID,
                  entity: ItunesEntityMusic.Album,
                  limit: options.albumLimit
                })
              );

              // First index is always the collection, the remaining are songs of that collection
              for (let index = 1; index < itunesSongs.resultCount; ++index) {
                const song = itunesSongs.results[index];

                songs.push(
                  new Song({
                    id: song.trackId,
                    name: song.trackName,
                    duration: song.trackTimeMillis,
                    genre: song.primaryGenreName,
                    track: song.trackNumber,
                    artistId: artistResult.artistId,
                    albumId: albumResult.collectionId
                  })
                );
              }
            }
          }
        }
      }

      resolve(
        new SourceResult({
          result: new MusicResult({
            artists: artists,
            albums: albums,
            songs: songs
          }),
          source: this
        })
      );
    });

  getAlbum = (options: MusicSearchOptions) =>
    new Promise<SourceResult<MusicResult>>(async (resolve, reject) => {
      const albums = Array<Album>();
      const songs = Array<Song>();

      const itunesAlbums = await searchItunes(
        new ItunesSearchOptions({
          term: options.query,
          entity: ItunesEntityMusic.Album,
          limit: options.albumLimit
        })
      );

      // Lookup all songs with found album (collection) id
      for (let albumResult of itunesAlbums.results) {
        if (albumResult.collectionId) {
          albums.push(
            new Album({
              id: albumResult.collectionId,
              name: albumResult.collectionName,
              trackCount: albumResult.trackCount
            })
          );

          const itunesSongs = await lookupItunes(
            new ItunesLookupOptions({
              keys: [albumResult.collectionId.toString()],
              keyType: ItunesLookupType.ID,
              entity: ItunesEntityMusic.Song,
              limit: options.songLimit
            })
          );

          // First index is always the collection, the remaining are songs of that collection
          for (let index = 1; index < itunesSongs.resultCount; ++index) {
            const song = itunesSongs.results[index];

            songs.push(
              new Song({
                id: song.trackId,
                name: song.trackName,
                duration: song.trackTimeMillis,
                genre: song.primaryGenreName,
                track: song.trackNumber,
                albumId: albumResult.collectionId
              })
            );
          }
        }
      }

      resolve(
        new SourceResult<MusicResult>({
          result: new MusicResult({ albums: albums, songs: songs }),
          source: this
        })
      );
    });

  getSong = (options: MusicSearchOptions) =>
    new Promise<SourceResult<MusicResult>>(async (resolve, reject) => {
      const songs = Array<Song>();

      const itunesSongs = await searchItunes(
        new ItunesSearchOptions({
          term: options.query,
          entity: ItunesEntityMusic.Song,
          limit: options.songLimit
        })
      );

      for (let song of itunesSongs.results)
        songs.push(
          new Song({
            id: song.trackId,
            name: song.trackName,
            track: song.trackNumber,
            duration: song.trackTimeMillis,
            genre: song.primaryGenreName
          })
        );

      resolve(
        new SourceResult<MusicResult>({
          result: new MusicResult({ songs: songs }),
          source: this
        })
      );
    });
}
