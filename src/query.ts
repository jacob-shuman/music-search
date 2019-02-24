import {MusicSource} from "./sources/source";

export interface MusicQuery {
  query: string;
  sources?: MusicSource[];

  artistSourceLimit?: number;
  albumSourceLimit?: number;
  songSourceLimit?: number;
}

export interface MusicArtistQuery extends MusicQuery {
  artistSearchLimit?: number;
  albumSearchLimit?: number;
  songSearchLimit?: number;
}

export interface MusicAlbumQuery extends MusicQuery {
  albumSearchLimit?: number;
  songSearchLimit?: number;
}

export interface MusicSongQuery extends MusicQuery {
  songSearchLimit?: number;
}
