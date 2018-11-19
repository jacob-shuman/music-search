"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SourceResult {
    constructor(options) {
        this.source = options.source;
        this.result = options.result;
        this.success = options.success || false;
    }
}
exports.SourceResult = SourceResult;
class MusicResult {
    constructor(options) {
        this.artists = options.artists || [];
        this.albums = options.albums || [];
        this.songs = options.songs || [];
    }
    getArtist(id) {
        let foundArtist = undefined;
        this.artists.forEach((artist) => {
            if (artist.id == id)
                foundArtist = artist;
        });
        return foundArtist;
    }
    // Get all songs with a matching [artistId]
    getArtistAlbums(artist) {
        const albums = Array();
        this.albums.forEach((album) => {
            if (album.artistId == artist.id)
                albums.push(album);
        });
        return albums;
    }
    // Get all songs with a matching [artistId]
    getArtistSongs(artist) {
        const foundSongs = Array();
        this.songs.forEach((song) => {
            if (song.artistId == artist.id)
                foundSongs.push(song);
        });
        return foundSongs;
    }
    getAlbum(id) {
        let foundAlbum = undefined;
        this.albums.forEach((album) => {
            if (album.id == id)
                foundAlbum = album;
        });
        return foundAlbum;
    }
    getAlbumArtist(id) {
        let foundArtist = undefined;
        this.artists.forEach((artist) => {
            if (artist.id == id)
                foundArtist = artist;
        });
        return foundArtist;
    }
    // Get all songs with a matching [albumId]
    getAlbumSongs(album) {
        const foundSongs = Array();
        this.songs.forEach((song) => {
            if (song.albumId == album.id)
                foundSongs.push(song);
        });
        return foundSongs;
    }
    getSong(id) {
        let foundSong = undefined;
        this.songs.forEach((song) => {
            if (song.id == id)
                foundSong = song;
        });
        return foundSong;
    }
    getSongArtist(id) {
        let foundArtist = undefined;
        this.artists.forEach((artist) => {
            if (artist.id == id)
                foundArtist = artist;
        });
        return foundArtist;
    }
    getSongAlbum(song) {
        let foundAlbum = undefined;
        this.albums.forEach((album) => {
            if (album.id == song.id)
                foundAlbum = album;
        });
        return foundAlbum;
    }
}
exports.MusicResult = MusicResult;
