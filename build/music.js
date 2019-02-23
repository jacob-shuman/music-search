"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MusicResult {
    constructor(options) {
        this.source = options.source;
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
    getArtistAlbums(id) {
        const albums = Array();
        this.albums.forEach((album) => {
            if (album.artistId == id)
                albums.push(album);
        });
        return albums;
    }
    // Get all songs with a matching [artistId]
    getArtistSongs(id) {
        const foundSongs = Array();
        this.songs.forEach((song) => {
            if (song.artistId == id)
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
    // Get all songs with a matching [albumId]
    getAlbumSongs(id) {
        const foundSongs = Array();
        this.songs.forEach((song) => {
            if (song.albumId == id)
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
}
exports.MusicResult = MusicResult;
