"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Artist {
    constructor(options) {
        this.id = options.id || -1;
        this.name = options.name || "";
    }
}
exports.Artist = Artist;
class Album {
    constructor(options) {
        this.id = options.id || -1;
        this.name = options.name || "";
        this.trackCount = options.trackCount || -1;
        this.artistId = options.artistId || -1;
    }
}
exports.Album = Album;
class Song {
    constructor(options) {
        this.id = options.id || -1;
        this.name = options.name || "";
        this.track = options.track || -1;
        this.duration = options.duration || -1;
        this.genre = options.genre || "";
        this.artistId = options.artistId || -1;
        this.albumId = options.albumId || -1;
    }
}
exports.Song = Song;
