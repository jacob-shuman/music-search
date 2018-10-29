import { Artist } from "../music/artist";
import { Album } from "../music/album";
import { Song } from "../music/song";

import { Source } from "./source";
import { SourceResult } from "../result";

export class ItunesSource implements Source {
  name = "Itunes";

  getArtist = (options: {}) =>
    new Promise<SourceResult<Artist>>((resolve, reject) => {});

  getAlbum = (options: {}) =>
    new Promise<SourceResult<Album>>((resolve, reject) => {});

  getSong = (options: {}) =>
    new Promise<SourceResult<Song>>((resolve, reject) => {
      console.log("");
    });
}
