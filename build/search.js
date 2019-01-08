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
var MusicSearch;
(function (MusicSearch) {
    MusicSearch.getArtist = (options) => __awaiter(this, void 0, void 0, function* () {
        let results = [];
        // TODO: Set [options.sources] to default sources
        if (!options.sources)
            options.sources = [];
        for (let index = 0; index < options.sources.length; index++)
            results.push(yield options.sources[index].getArtist(options));
        return results;
    });
    MusicSearch.getAlbum = (options) => __awaiter(this, void 0, void 0, function* () {
        let results = [];
        // TODO: Set [options.sources] to default sources
        if (!options.sources)
            options.sources = [];
        for (let index = 0; index < options.sources.length; index++)
            results.push(yield options.sources[index].getAlbum(options));
        return results;
    });
    MusicSearch.getSong = (options) => __awaiter(this, void 0, void 0, function* () {
        let results = [];
        // TODO: Set [options.sources] to default sources
        if (!options.sources)
            options.sources = [];
        for (let index = 0; index < options.sources.length; index++)
            results.push(yield options.sources[index].getSong(options));
        return results;
    });
})(MusicSearch = exports.MusicSearch || (exports.MusicSearch = {}));
