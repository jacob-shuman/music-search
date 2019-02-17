import {Source} from "../source";
import {getArtist, getArtistById} from "./artists";
import {getAlbum, getAlbumById} from "./albums";
import {getSong} from "./songs";

export class ItunesSearchSource implements Source {
  name = "Itunes";

  getArtist = getArtist;
  getArtistById = getArtistById;

  getAlbum = getAlbum;
  getAlbumById = getAlbumById;

  getSong = getSong;
}
