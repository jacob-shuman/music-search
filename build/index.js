"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = require("./search");
var search_2 = require("./search");
exports.searchArtist = search_2.searchArtist;
exports.searchAlbum = search_2.searchAlbum;
exports.searchSong = search_2.searchSong;
var itunesSource_1 = require("./sources/itunes/itunesSource");
exports.ItunesSearchSource = itunesSource_1.ItunesSearchSource;
var result_1 = require("./result");
exports.MusicResult = result_1.MusicResult;
var MusicSearch;
(function (MusicSearch) {
    // Functions
    MusicSearch.getArtist = search_1.searchArtist;
    MusicSearch.getAlbum = search_1.searchAlbum;
    MusicSearch.getSong = search_1.searchSong;
})(MusicSearch = exports.MusicSearch || (exports.MusicSearch = {}));
exports.default = MusicSearch;
