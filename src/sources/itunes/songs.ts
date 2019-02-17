import Itunes from "node-itunes-search";

import {Artist, Album, Song, MusicResult} from "../../music";
import {SourceResult} from "../source";
import {MusicSearchOptions} from "../../search";
import {ItunesSearchSource} from "./itunesSource";

import {getArtistById} from "./artists";
import {getAlbumById} from "./albums";

export async function getSong(options: MusicSearchOptions): Promise<SourceResult<MusicResult>> {
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
    let artistResult = artists.find((artist: Artist) => artist.id == songResult.artistId);

    // If it's a new artist then asynchronously retrieve it
    if (!artistResult && songResult.artistId)
      artistResult = await getArtistById(songResult.artistId);

    // TODO work with song.albumId directly
    // Find song album
    // Assign possibly already existant album
    let albumResult = albums.find((album: Album) => album.id == songResult.collectionId);

    // If it's a new album then asynchronously retrieve it
    if (!albumResult && songResult.collectionId)
      albumResult = await getAlbumById(songResult.collectionId);

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
    source: new ItunesSearchSource()
  });
}
