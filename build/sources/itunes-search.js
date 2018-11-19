"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const music_1 = require("../music/music");
const result_1 = require("../result");
const node_itunes_search_1 = require("node-itunes-search");
class ItunesSearchSource {
    constructor() {
        this.name = "Itunes";
        this.getArtist = (options) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const artists = Array();
            const albums = Array();
            const songs = Array();
            const itunesArtists = yield node_itunes_search_1.searchItunes(new node_itunes_search_1.ItunesSearchOptions({
                term: options.query,
                entity: node_itunes_search_1.ItunesEntityMusic.MusicArtist,
                limit: options.artistLimit
            }));
            for (let artistResult of itunesArtists.results) {
                if (artistResult.artistId) {
                    artists.push(new music_1.Artist({
                        id: artistResult.artistId,
                        name: artistResult.artistName
                    }));
                    const itunesAlbums = yield node_itunes_search_1.lookupItunes(new node_itunes_search_1.ItunesLookupOptions({
                        keys: [artistResult.artistId.toString()],
                        keyType: node_itunes_search_1.ItunesLookupType.ID,
                        entity: node_itunes_search_1.ItunesEntityMusic.Album,
                        limit: options.albumLimit
                    }));
                    for (let albumResult of itunesAlbums.results) {
                        if (albumResult.collectionId) {
                            albums.push(new music_1.Album({
                                id: albumResult.collectionId,
                                name: albumResult.collectionName,
                                trackCount: albumResult.trackCount,
                                artistId: artistResult.artistId
                            }));
                            const itunesSongs = yield node_itunes_search_1.lookupItunes(new node_itunes_search_1.ItunesLookupOptions({
                                keys: [artistResult.artistId.toString()],
                                keyType: node_itunes_search_1.ItunesLookupType.ID,
                                entity: node_itunes_search_1.ItunesEntityMusic.Album,
                                limit: options.albumLimit
                            }));
                            // First index is always the collection, the remaining are songs of that collection
                            for (let index = 1; index < itunesSongs.resultCount; ++index) {
                                const song = itunesSongs.results[index];
                                songs.push(new music_1.Song({
                                    id: song.trackId,
                                    name: song.trackName,
                                    duration: song.trackTimeMillis,
                                    genre: song.primaryGenreName,
                                    track: song.trackNumber,
                                    artistId: artistResult.artistId,
                                    albumId: albumResult.collectionId
                                }));
                            }
                        }
                    }
                }
            }
            resolve(new result_1.SourceResult({
                result: new result_1.MusicResult({
                    artists: artists,
                    albums: albums,
                    songs: songs
                }),
                source: this
            }));
        }));
        this.getAlbum = (options) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const albums = Array();
            const songs = Array();
            const itunesAlbums = yield node_itunes_search_1.searchItunes(new node_itunes_search_1.ItunesSearchOptions({
                term: options.query,
                entity: node_itunes_search_1.ItunesEntityMusic.Album,
                limit: options.albumLimit
            }));
            // Lookup all songs with found album (collection) id
            for (let albumResult of itunesAlbums.results) {
                if (albumResult.collectionId) {
                    albums.push(new music_1.Album({
                        id: albumResult.collectionId,
                        name: albumResult.collectionName,
                        trackCount: albumResult.trackCount
                    }));
                    const itunesSongs = yield node_itunes_search_1.lookupItunes(new node_itunes_search_1.ItunesLookupOptions({
                        keys: [albumResult.collectionId.toString()],
                        keyType: node_itunes_search_1.ItunesLookupType.ID,
                        entity: node_itunes_search_1.ItunesEntityMusic.Song,
                        limit: options.songLimit
                    }));
                    // First index is always the collection, the remaining are songs of that collection
                    for (let index = 1; index < itunesSongs.resultCount; ++index) {
                        const song = itunesSongs.results[index];
                        songs.push(new music_1.Song({
                            id: song.trackId,
                            name: song.trackName,
                            duration: song.trackTimeMillis,
                            genre: song.primaryGenreName,
                            track: song.trackNumber,
                            albumId: albumResult.collectionId
                        }));
                    }
                }
            }
            resolve(new result_1.SourceResult({
                result: new result_1.MusicResult({ albums: albums, songs: songs }),
                source: this
            }));
        }));
        this.getSong = (options) => new Promise((resolve, reject) => {
            const itunesOptions = new node_itunes_search_1.ItunesSearchOptions({
                term: options.query,
                entity: node_itunes_search_1.ItunesEntityMusic.Song,
                limit: options.songLimit
            });
            node_itunes_search_1.searchItunes(itunesOptions).then((itunesSongs) => {
                const songs = Array();
                for (let song of itunesSongs.results)
                    songs.push(new music_1.Song({
                        id: song.trackId,
                        name: song.trackName,
                        track: song.trackNumber,
                        duration: song.trackTimeMillis,
                        genre: song.primaryGenreName
                    }));
                resolve(new result_1.SourceResult({
                    result: new result_1.MusicResult({ songs: songs }),
                    source: this
                }));
            });
        });
    }
}
exports.ItunesSearchSource = ItunesSearchSource;
