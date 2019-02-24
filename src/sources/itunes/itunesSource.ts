import {MusicSource} from "../source";
import {getArtist, getArtistById} from "./artists";
import {getAlbum, getAlbumById} from "./albums";
import {getSong} from "./songs";

export class ItunesSearchSource implements MusicSource {
  name = "Itunes";

  getArtist = getArtist;
  getArtistById = getArtistById;

  getAlbum = getAlbum;
  getAlbumById = getAlbumById;

  getSong = getSong;
}
