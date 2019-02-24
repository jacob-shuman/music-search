import {MusicSource} from "./sources/source";

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

export class MusicResult {
  readonly artists: MusicArtist[];
  readonly albums: MusicAlbum[];
  readonly songs: MusicSong[];
  readonly source?: MusicSource;

  constructor(options: {
    artists?: MusicArtist[];
    albums?: MusicAlbum[];
    songs?: MusicSong[];
    source?: MusicSource;
  }) {
    this.artists = options.artists || [];
    this.albums = options.albums || [];
    this.songs = options.songs || [];
    this.source = options.source;
  }

  getArtist(id: number): MusicArtist | undefined {
    let foundArtist: MusicArtist | undefined = undefined;

    this.artists.forEach((artist) => {
      if (artist.id == id) foundArtist = artist;
    });

    return foundArtist;
  }

  // Get all songs with a matching [artistId]
  getArtistAlbums(id: number): MusicAlbum[] {
    const albums: MusicAlbum[] = [];

    this.albums.forEach((album) => {
      if (album.artistId == id) albums.push(album);
    });

    return albums;
  }

  // Get all songs with a matching [artistId]
  getArtistSongs(id: number): MusicSong[] {
    const foundSongs: MusicSong[] = [];

    this.songs.forEach((song) => {
      if (song.artistId == id) foundSongs.push(song);
    });

    return foundSongs;
  }

  getAlbum(id: number): MusicAlbum | undefined {
    let foundAlbum: MusicAlbum | undefined = undefined;

    this.albums.forEach((album) => {
      if (album.id == id) foundAlbum = album;
    });

    return foundAlbum;
  }

  // Get all songs with a matching [albumId]
  getAlbumSongs(id: number): MusicSong[] {
    const foundSongs: MusicSong[] = [];

    this.songs.forEach((song) => {
      if (song.albumId == id) foundSongs.push(song);
    });

    return foundSongs;
  }

  getSong(id: number): MusicSong | undefined {
    let foundSong: MusicSong | undefined = undefined;

    this.songs.forEach((song) => {
      if (song.id == id) foundSong = song;
    });

    return foundSong;
  }
}
