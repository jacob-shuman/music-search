export interface MusicArtist {
  id: number;
  name: string;

  artUrl?: string;
}

export interface MusicAlbum {
  id: number;
  name: string;

  trackCount?: number;
  artUrl?: string;
  artistId?: number;
}

export interface MusicSong {
  id: number;
  name: string;

  // Track index in album
  track?: number;

  // Time in milliseconds
  duration?: number;

  genre?: string;

  artistId?: number;
  albumId?: number;
}
