import Itunes from "node-itunes-search";

import {Artist, Album, SongMusicQuery, MusicResult} from "../../music";
import {ItunesSearchSource} from "./itunesSource";

import {getArtistById} from "./artists";
import {getAlbumById} from "./albums";

export async function getSong(options: SongMusicQuery): Promise<MusicResult> {
  let songResult: MusicResult = new MusicResult({
    source: new ItunesSearchSource(),
    artists: [],
    albums: [],
    songs: []
  });

  // Array of [ItunesProperties] matches
  // This filters out any results without the required properties
  const songSearch: Array<Itunes.Properties> = (await Itunes.search({
    term: options.query,
    entity: Itunes.Entity.Music.Song,
    limit: options.songSearchLimit
  })).results.filter((prop: Itunes.Properties) => {
    return prop.trackId && prop.trackName;
  });

  // Parsing song properties
  for (let song of songSearch) {
    // TODO work with song.artistId directly
    // Find song artist
    // Assign possibly already existant artist
    let artistResult: Artist | undefined = songResult.artists.find(
      (artist: Artist) => artist.id == song.artistId
    );

    // If it's a new artist then asynchronously retrieve it
    if (!artistResult && song.artistId) artistResult = await getArtistById(song.artistId);

    // TODO work with song.albumId directly
    // Find song album
    // Assign possibly already existant album
    let albumResult: Album | undefined = songResult.albums.find(
      (album: Album) => album.id == song.collectionId
    );

    // If it's a new album then asynchronously retrieve it
    if (!albumResult && song.collectionId) albumResult = await getAlbumById(song.collectionId);

    if (artistResult) {
      // song.artistId = artistResult.id;

      // Check if artist with id already exists
      if (!songResult.artists.some((artist: Artist) => artistResult!.id == artist.id))
        songResult.artists.push(artistResult);
    }

    if (albumResult) {
      // Applying artist id to album if artist was found
      if (artistResult) albumResult.artistId = artistResult.id;

      // song.albumId = albumResult.id;

      // Check if artist with id already exists
      if (!songResult.albums.some((album: Album) => albumResult!.id == album.id))
        songResult.albums.push(albumResult);
    }

    songResult.songs.push({
      id: song.trackId!,
      name: song.trackName!,
      track: song.trackNumber,
      duration: song.trackTimeMillis,
      genre: song.primaryGenreName,
      artistId: artistResult ? artistResult.id : undefined,
      albumId: albumResult ? albumResult.id : undefined
    });
  }

  return songResult;
}
