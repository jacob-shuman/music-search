"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_1 = require("./search");
exports.MusicSearch = search_1.MusicSearch;
exports.MusicSearchOptions = search_1.MusicSearchOptions;
var result_1 = require("./result");
exports.SourceResult = result_1.SourceResult;
exports.MusicResult = result_1.MusicResult;
var itunes_search_1 = require("./sources/itunes-search");
exports.ItunesSearchSource = itunes_search_1.ItunesSearchSource;
var music_1 = require("./music/music");
exports.Artist = music_1.Artist;
exports.Album = music_1.Album;
exports.Song = music_1.Song;
