import { Artist, Album, Song, MusicResult } from "../music";

import { Source, SourceResult } from "./source";

import Itunes from "node-itunes-search";
import { MusicSearchOptions } from "../search";

export class ItunesSearchSource implements Source {
  name = "Itunes";

  async getArtist(options: MusicSearchOptions): Promise<SourceResult<MusicResult>> {
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
              keys: [artistResult.artistId.toString()],
              keyType: Itunes.LookupType.ID,
              entity: Itunes.Entity.Music.Album,
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
      source: this
    });
  }

  async getArtistById(id: number): Promise<Artist | undefined> {
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

  async getAlbum(options: MusicSearchOptions): Promise<SourceResult<MusicResult>> {
    const albums = Array<Album>();
    const songs = Array<Song>();

    const itunesAlbums = await Itunes.search({
      term: options.query,
      entity: Itunes.Entity.Music.Album,
      limit: options.albumSourceLimit
    });

    // Lookup all songs with found album (collection) id
    for (let albumResult of itunesAlbums.results) {
      if (albumResult.collectionId && albumResult.collectionName) {
        albums.push({
          id: albumResult.collectionId,
          name: albumResult.collectionName,
          trackCount: albumResult.trackCount
        });

        const itunesSongs = await Itunes.lookup({
          keys: [albumResult.collectionId.toString()],
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
            albumId: albumResult.collectionId
          });
        }
      }
    }

    return new SourceResult<MusicResult>({
      result: new MusicResult({ albums: albums, songs: songs }),
      source: this
    });
  }

  async getAlbumById(id: number): Promise<Album | undefined> {
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

  async getSong(options: MusicSearchOptions): Promise<SourceResult<MusicResult>> {
    const artists: Array<Artist> = [];
    const albums: Array<Album> = [];
    const songs: Array<Song> = [];

    // Array of [ItunesProperties] matches
    // This filters out any results without the required properties
    const itunesSongs: Array<Itunes.Properties> = (await Itunes.search({
      term: options.query,
      entity: Itunes.Entity.Music.Song,
      limit: options.songSourceLimit
    })).results.filter((prop: Itunes.Properties) => {
      return prop.trackId && prop.trackName;
    });

    // Parsing song properties
    for (let songResult of itunesSongs) {
      const song: Song = {
        id: songResult.trackId!,
        name: songResult.trackName!,
        track: songResult.trackNumber,
        duration: songResult.trackTimeMillis,
        genre: songResult.primaryGenreName
      };

      // TODO work with song.artistId directly
      // Find song artist
      // Assign possibly already existant artist
      let artistResult = artists.find((artist: Artist) => artist.id == song.artistId);

      // If it's a new artist then asynchronously retrieve it
      if (!artistResult && songResult.artistId)
        artistResult = await this.getArtistById(songResult.artistId);

      // TODO work with song.albumId directly
      // Find song album
      // Assign possibly already existant album
      let albumResult = albums.find((album: Album) => album.id == song.albumId);

      // If it's a new album then asynchronously retrieve it
      if (!albumResult && songResult.collectionId)
        albumResult = await this.getAlbumById(songResult.collectionId);

      if (artistResult) {
        song.artistId = artistResult.id;

        // Check if artist with id already exists
        if (!artists.some((artist: Artist) => artistResult!.id == artist.id))
          artists.push(artistResult);
      }

      if (albumResult) {
        // Applying artist id to album if artist was found
        if (artistResult) albumResult.artistId = artistResult.id;

        song.albumId = albumResult.id;

        // Check if artist with id already exists
        if (!albums.some((album: Album) => albumResult!.id == album.id)) albums.push(albumResult);
      }

      songs.push(song);
    }

    return new SourceResult<MusicResult>({
      result: new MusicResult({
        artists: artists,
        albums: albums,
        songs: songs
      }),
      source: this
    });
  }
}
