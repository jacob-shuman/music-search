export class Artist {
  id: number;

  name: string;

  constructor(options: { id?: number; name?: string }) {
    this.id = options.id || -1;
    this.name = options.name || "";
  }
}

export class Album {
  id: number;

  name: string;

  trackCount: number;

  artistId: number;

  constructor(options: {
    id?: number;
    name?: string;
    trackCount?: number;
    artistId?: number;
  }) {
    this.id = options.id || -1;
    this.name = options.name || "";
    this.trackCount = options.trackCount || -1;

    this.artistId = options.artistId || -1;
  }
}

export class Song {
  id: number;

  name: string;

  // Track index in album
  track: number;

  // Time in milliseconds
  duration: number;

  genre: string;

  artistId: number;

  albumId: number;

  constructor(options: {
    id?: number;
    name?: string;
    track?: number;
    duration?: number;
    genre?: string;
    artistId?: number;
    albumId?: number;
  }) {
    this.id = options.id || -1;
    this.name = options.name || "";
    this.track = options.track || -1;
    this.duration = options.duration || -1;
    this.genre = options.genre || "";

    this.artistId = options.artistId || -1;
    this.albumId = options.albumId || -1;
  }
}
