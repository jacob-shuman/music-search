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
class MusicSearchOptions {
    constructor(options) {
        // this.sources = options.sources || Sources.values;
        this.query = options.query;
        this.sources = options.sources || [];
        this.artistLimit = options.artistLimit;
        this.albumLimit = options.albumLimit;
        this.songLimit = options.songLimit;
    }
}
exports.MusicSearchOptions = MusicSearchOptions;
class MusicSearch {
    static getArtist(options) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let searchOptions = options || this.options;
            let results = [];
            for (let index = 0; index < searchOptions.sources.length; index++)
                results.push(yield searchOptions.sources[index].getArtist(searchOptions));
            resolve(results);
        }));
    }
    static getAlbum(options) {
        return new Promise((resolve, Album) => __awaiter(this, void 0, void 0, function* () {
            let searchOptions = options || this.options;
            let results = [];
            for (let index = 0; index < searchOptions.sources.length; index++)
                results.push(yield searchOptions.sources[index].getAlbum(searchOptions));
            resolve(results);
        }));
    }
    static getSong(options) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let searchOptions = options || this.options;
            let results = [];
            for (let index = 0; index < searchOptions.sources.length; index++)
                results.push(yield searchOptions.sources[index].getSong(searchOptions));
            resolve(results);
        }));
    }
}
exports.MusicSearch = MusicSearch;
