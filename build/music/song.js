"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Song {
    constructor(options) {
        this.name = options.name || "";
        this.track = options.track || -1;
        this.duration = options.duration || -1;
        this.genre = options.genre || "";
    }
}
exports.Song = Song;
