import {MusicSource} from "../source";
import {getArtist, getArtistById, getArtistAlbums, getArtistSongs} from "./artists";
import {getAlbum, getAlbumById, getAlbumArtist, getAlbumSongs} from "./albums";
import {getSong, getSongArtist, getSongAlbum} from "./songs";

export class ItunesSearchSource implements MusicSource {
  name = "Itunes";

  getArtist = getArtist;
  getArtistById = getArtistById;
  getArtistAlbums = getArtistAlbums;
  getArtistSongs = getArtistSongs;

  getAlbum = getAlbum;
  getAlbumById = getAlbumById;
  getAlbumArtist = getAlbumArtist;
  getAlbumSongs = getAlbumSongs;

  getSong = getSong;
  getSongArtist = getSongArtist;
  getSongAlbum = getSongAlbum;
}
