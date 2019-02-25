import {MusicSource} from "./sources/source";

export interface MusicQuery {
  // A string to search against
  query: string;

  // A list of sources to search using the [query]
  sources?: MusicSource[];
}

export interface MusicArtistQuery extends MusicQuery {
  // Find and include artist albums in result?
  includeAlbums?: boolean;

  // Find and include artist album songs in result?
  includeSongs?: boolean;

  // Maximum number of artists per source
  artistLimit?: number;

  // Maximum number of albums per artist
  albumLimit?: number;

  // Maximum number of songs per album
  songLimit?: number;
}

export interface MusicAlbumQuery extends MusicQuery {
  // Find and include artist in result?
  includeArtist?: boolean;

  // Find and include album songs in result?
  includeSongs?: boolean;

  // Maximum number of albums per source
  albumLimit?: number;

  // Maximum number of songs per album
  songLimit?: number;
}

export interface MusicSongQuery extends MusicQuery {
  // Find and include artist in result?
  includeArtist?: boolean;

  // Find and include album in result?
  includeAlbum?: boolean;

  // Maximum number of songs per source
  songLimit?: number;
}
