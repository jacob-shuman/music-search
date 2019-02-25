import Itunes from "node-itunes-search";

import {MusicArtist, MusicAlbum, MusicSong} from "../../music";
import {MusicSongQuery} from "../../query";
import {MusicResult} from "../../result";
import {ItunesSearchSource} from "./itunesSource";

import {getArtistById} from "./artists";
import {getAlbumById} from "./albums";

export async function getSongArtist(
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

export async function getSongAlbum(
  albumId: number,
  albums: MusicAlbum[]
): Promise<MusicAlbum | undefined> {
  let albumResult: MusicAlbum | undefined = undefined;

  // Assign possibly already existing album
  albumResult = albums.find((currentAlbum: MusicAlbum) => currentAlbum.id == albumId);

  // If it's a new album then asynchronously retrieve it
  if (!albumResult && albumId) albumResult = await getAlbumById(albumId);

  return albumResult;
}

export async function getSong(options: MusicSongQuery): Promise<MusicResult> {
  const songResult: MusicResult = new MusicResult({
    source: new ItunesSearchSource(),
    artists: [],
    albums: [],
    songs: []
  });

  // Array of [ItunesProperties] matches
  // This filters out any results without the required properties
  const songSearch: Itunes.Properties[] = (await Itunes.search({
    term: options.query,
    entity: Itunes.Entity.Music.Song,
    limit: options.songLimit
  })).results.filter((prop: Itunes.Properties) => {
    return prop.trackId && prop.trackName;
  });

  for (let song of songSearch) {
    // Parsing basic song properties
    const currentSong: MusicSong = {
      id: song.trackId!,
      name: song.trackName!,
      track: song.trackNumber,
      duration: song.trackTimeMillis,
      genre: song.primaryGenreName
    };

    let songArtist: MusicArtist | undefined = undefined;
    let songAlbum: MusicAlbum | undefined = undefined;

    // Find song artist
    if (options.includeArtist && song.artistId) {
      songArtist = await getSongArtist(song.artistId, songResult.artists);

      if (songArtist) {
        // Apply found song artist to [currentSong]
        currentSong.artistId = songArtist.id;

        // If the found artist doesn't exist in [songResult]'s [artists] array then push it
        if (songResult.getArtist(songArtist.id) == undefined) songResult.artists.push(songArtist);
      }
    }

    // Find song album
    if (options.includeAlbum && song.collectionId) {
      songAlbum = await getSongAlbum(song.collectionId, songResult.albums);

      if (songAlbum) {
        // Applying artist id to album if the artist was found
        if (songArtist) songAlbum.artistId = songArtist.id;

        // Apply found song album to [currentSong]
        currentSong.albumId = songAlbum.id;

        // If the found album doesn't exist in [songResult]'s [albums] array then push it
        if (songResult.getAlbum(songAlbum.id) == undefined) songResult.albums.push(songAlbum);
      }
    }

    songResult.songs.push(currentSong);
  }

  return songResult;
}
