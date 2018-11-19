import { Source } from "./sources/source";
import { Artist, Album, Song } from "./music";

export class SourceResult<T> {
  // Copy of source used
  readonly source: Source;

  // Result from source
  readonly result: T;

  // Success state of the source action
  readonly success: boolean;

  constructor(options: { result: T; source: Source; success?: boolean }) {
    this.source = options.source;
    this.result = options.result;
    this.success = options.success || false;
  }
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
  getArtistAlbums(artist: Artist): Array<Album> {
    const albums = Array<Album>();

    this.albums.forEach((album) => {
      if (album.artistId == artist.id) albums.push(album);
    });

    return albums;
  }

  // Get all songs with a matching [artistId]
  getArtistSongs(artist: Artist): Array<Song> {
    const foundSongs = Array<Song>();

    this.songs.forEach((song) => {
      if (song.artistId == artist.id) foundSongs.push(song);
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

  getAlbumArtist(id: number): Artist | undefined {
    let foundArtist: Artist | undefined = undefined;

    this.artists.forEach((artist) => {
      if (artist.id == id) foundArtist = artist;
    });

    return foundArtist;
  }

  // Get all songs with a matching [albumId]
  getAlbumSongs(album: Album): Array<Song> {
    const foundSongs = Array<Song>();

    this.songs.forEach((song) => {
      if (song.albumId == album.id) foundSongs.push(song);
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

  getSongArtist(id: number): Artist | undefined {
    let foundArtist: Artist | undefined = undefined;

    this.artists.forEach((artist) => {
      if (artist.id == id) foundArtist = artist;
    });

    return foundArtist;
  }

  getSongAlbum(song: Song): Album | undefined {
    let foundAlbum: Album | undefined = undefined;

    this.albums.forEach((album) => {
      if (album.id == song.id) foundAlbum = album;
    });

    return foundAlbum;
  }
}
