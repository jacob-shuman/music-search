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
const result_1 = require("../result");
const node_itunes_search_1 = require("node-itunes-search");
class ItunesSearchSource {
    constructor() {
        this.name = "Itunes";
    }
    getArtist(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const artists = Array();
            const albums = Array();
            const songs = Array();
            const itunesArtists = yield node_itunes_search_1.searchItunes(new node_itunes_search_1.ItunesSearchOptions({
                term: options.query,
                entity: node_itunes_search_1.ItunesEntityMusic.MusicArtist,
                limit: options.artistLimit
            }));
            for (let artistResult of itunesArtists.results) {
                if (artistResult.artistId && artistResult.artistName) {
                    artists.push({
                        id: artistResult.artistId,
                        name: artistResult.artistName
                    });
                    const itunesAlbums = yield node_itunes_search_1.lookupItunes(new node_itunes_search_1.ItunesLookupOptions({
                        keys: [artistResult.artistId.toString()],
                        keyType: node_itunes_search_1.ItunesLookupType.ID,
                        entity: node_itunes_search_1.ItunesEntityMusic.Album,
                        limit: options.albumLimit
                    }));
                    for (let albumResult of itunesAlbums.results) {
                        if (albumResult.collectionId) {
                            albums.push({
                                id: albumResult.collectionId,
                                name: albumResult.collectionName,
                                trackCount: albumResult.trackCount,
                                artistId: artistResult.artistId
                            });
                            const itunesSongs = yield node_itunes_search_1.lookupItunes(new node_itunes_search_1.ItunesLookupOptions({
                                keys: [artistResult.artistId.toString()],
                                keyType: node_itunes_search_1.ItunesLookupType.ID,
                                entity: node_itunes_search_1.ItunesEntityMusic.Album,
                                limit: options.albumLimit
                            }));
                            // First index is always the collection, the remaining are songs of that collection
                            for (let index = 1; index < itunesSongs.resultCount; ++index) {
                                const song = itunesSongs.results[index];
                                //TODO filter out invalid songs prior
                                songs.push({
                                    id: song.trackId || -1,
                                    name: song.trackName || "",
                                    duration: song.trackTimeMillis,
                                    genre: song.primaryGenreName,
                                    track: song.trackNumber,
                                    artistId: artistResult.artistId,
                                    albumId: albumResult.collectionId
                                });
                            }
                        }
                    }
                }
            }
            return new result_1.SourceResult({
                result: new result_1.MusicResult({
                    artists: artists,
                    albums: albums,
                    songs: songs
                }),
                source: this
            });
        });
    }
    getArtistById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const artists = yield node_itunes_search_1.lookupItunes(new node_itunes_search_1.ItunesLookupOptions({
                keyType: node_itunes_search_1.ItunesLookupType.ID,
                keys: [id.toString()],
                entity: node_itunes_search_1.ItunesEntityMusic.MusicArtist,
                limit: 1
            }));
            const artist = artists.resultCount > 0 ? artists.results[0] : undefined;
            if (artist && artist.artistId && artist.artistName)
                return {
                    id: artist.artistId,
                    name: artist.artistName
                };
            else
                return undefined;
        });
    }
    getAlbum(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const albums = Array();
            const songs = Array();
            const itunesAlbums = yield node_itunes_search_1.searchItunes(new node_itunes_search_1.ItunesSearchOptions({
                term: options.query,
                entity: node_itunes_search_1.ItunesEntityMusic.Album,
                limit: options.albumLimit
            }));
            // Lookup all songs with found album (collection) id
            for (let albumResult of itunesAlbums.results) {
                if (albumResult.collectionId && albumResult.collectionName) {
                    albums.push({
                        id: albumResult.collectionId,
                        name: albumResult.collectionName,
                        trackCount: albumResult.trackCount
                    });
                    const itunesSongs = yield node_itunes_search_1.lookupItunes(new node_itunes_search_1.ItunesLookupOptions({
                        keys: [albumResult.collectionId.toString()],
                        keyType: node_itunes_search_1.ItunesLookupType.ID,
                        entity: node_itunes_search_1.ItunesEntityMusic.Song,
                        limit: options.songLimit
                    }));
                    // First index is always the collection, the remaining are songs of that collection
                    for (let index = 1; index < itunesSongs.resultCount; ++index) {
                        const song = itunesSongs.results[index];
                        //TODO filter out invalid songs prior
                        songs.push({
                            id: song.trackId || -1,
                            name: song.trackName || "",
                            duration: song.trackTimeMillis,
                            genre: song.primaryGenreName,
                            track: song.trackNumber,
                            albumId: albumResult.collectionId
                        });
                    }
                }
            }
            return new result_1.SourceResult({
                result: new result_1.MusicResult({ albums: albums, songs: songs }),
                source: this
            });
        });
    }
    getAlbumById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const albums = yield node_itunes_search_1.lookupItunes(new node_itunes_search_1.ItunesLookupOptions({
                keyType: node_itunes_search_1.ItunesLookupType.ID,
                keys: [id.toString()],
                entity: node_itunes_search_1.ItunesEntityMusic.Album,
                limit: 1
            }));
            const album = albums.resultCount > 0 ? albums.results[0] : undefined;
            if (album && album.collectionId && album.collectionName)
                return {
                    id: album.collectionId,
                    name: album.collectionName,
                    artUrl: album.artworkUrl60
                        ? album.artworkUrl60.replace("60x60", "600x600")
                        : undefined
                };
            else
                return undefined;
        });
    }
    getSong(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const artists = [];
            const albums = [];
            const songs = [];
            // Array of [ItunesProperties] matches
            // This filters out any results without the required properties
            const itunesSongs = (yield node_itunes_search_1.searchItunes(new node_itunes_search_1.ItunesSearchOptions({
                term: options.query,
                entity: node_itunes_search_1.ItunesEntityMusic.Song,
                limit: options.songLimit
            }))).results.filter((prop) => {
                return prop.trackId && prop.trackName;
            });
            // Parsing song properties
            for (let songResult of itunesSongs) {
                const song = {
                    id: songResult.trackId,
                    name: songResult.trackName,
                    track: songResult.trackNumber,
                    duration: songResult.trackTimeMillis,
                    genre: songResult.primaryGenreName
                };
                // TODO work with song.artistId directly
                // Find song artist
                // Assign possibly already existant artist
                let artistResult = artists.find((artist) => artist.id == song.artistId);
                // If it's a new artist then asynchronously retrieve it
                if (!artistResult && songResult.artistId)
                    artistResult = yield this.getArtistById(songResult.artistId);
                // TODO work with song.albumId directly
                // Find song album
                // Assign possibly already existant album
                let albumResult = albums.find((album) => album.id == song.albumId);
                // If it's a new album then asynchronously retrieve it
                if (!albumResult && songResult.collectionId)
                    albumResult = yield this.getAlbumById(songResult.collectionId);
                if (artistResult) {
                    song.artistId = artistResult.id;
                    artists.push(artistResult);
                }
                if (albumResult) {
                    song.albumId = albumResult.id;
                    albums.push(albumResult);
                }
                songs.push(song);
            }
            return new result_1.SourceResult({
                result: new result_1.MusicResult({
                    artists: artists,
                    albums: albums,
                    songs: songs
                }),
                source: this
            });
        });
    }
}
exports.ItunesSearchSource = ItunesSearchSource;
