export interface Artist {
  id: number;
  name: string;

  artUrl?: string;
}

export interface Album {
  id: number;
  name: string;

  trackCount?: number;
  artUrl?: string;
  artistId?: number;
}

export interface Song {
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

export class MusicResult {
  readonly artists: Array<Artist>;

  readonly albums: Array<Album>;

  readonly songs: Array<Song>;

  constructor(options: {
    artists?: Array<Artist>;
    albums?: Array<Album>;
    songs?: Array<Song>;
  }) {
    this.artists = options.artists || [];
    this.albums = options.albums || [];
    this.songs = options.songs || [];
  }

  getArtist(id: number): Artist | undefined {
    let foundArtist: Artist | undefined = undefined;

    this.artists.forEach((artist) => {
      if (artist.id == id) foundArtist = artist;
    });

    return foundArtist;
  }

  // Get all songs with a matching [artistId]
  getArtistAlbums(id: number): Array<Album> {
    const albums = Array<Album>();

    this.albums.forEach((album) => {
      if (album.artistId == id) albums.push(album);
    });

    return albums;
  }

  // Get all songs with a matching [artistId]
  getArtistSongs(id: number): Array<Song> {
    const foundSongs = Array<Song>();

    this.songs.forEach((song) => {
      if (song.artistId == id) foundSongs.push(song);
    });

    return foundSongs;
  }

  getAlbum(id: number): Album | undefined {
    let foundAlbum: Album | undefined = undefined;

    this.albums.forEach((album) => {
      if (album.id == id) foundAlbum = album;
    });

    return foundAlbum;
  }

  // Get all songs with a matching [albumId]
  getAlbumSongs(id: number): Array<Song> {
    const foundSongs = Array<Song>();

    this.songs.forEach((song) => {
      if (song.albumId == id) foundSongs.push(song);
    });

    return foundSongs;
  }

  getSong(id: number): Song | undefined {
    let foundSong: Song | undefined = undefined;

    this.songs.forEach((song) => {
      if (song.id == id) foundSong = song;
    });

    return foundSong;
  }
}
