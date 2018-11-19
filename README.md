# music-search [![npm](https://img.shields.io/npm/v/music-search.svg)](https://www.npmjs.com/package/music-search) [![Build Status](https://travis-ci.org/jacob-shuman/music-search.svg?branch=master)](https://travis-ci.org/jacob-shuman/music-search)

> A music metadata search utility package for Node JS.

## Installation

```bash
$ npm install music-search
```

## Importing

#### Commonjs

```ts
const musicSearch = require("music-search");
```

#### ES6

```ts
import { MusicSearch } from "music-search";
```

## Available Sources

| Name              | Implemented |
| :---------------- | ----------: |
| iTunes Search API |         Yes |
| Spotify API       |          No |

## Usage

### Artist Search

### Album Search

```ts
const itunesAPI = require("node-itunes-search");

const searchOptions = new itunesAPI.ItunesSearchOptions({
  term: "Queen Bohemian Rhapsody", // All searches require a single string query.

  limit: 1 // An optional maximum number of returned results may be specified.
});

itunesAPI.searchItunes(searchOptions).then((searchResult: ItunesResult) => {
  console.log(searchResult);
});
```

### Song Search

```ts
import { lookupItunes, ItunesLookupOptions } from "node-itunes-search";

const lookupOptions = new ItunesLookupOptions({
  keys: ["560857776"], // Specify ID(s) of desired content
  keyType: ItunesLookupType.ID // Searching by content ID(s)
});

lookupItunes(lookupOptions).then((result: ItunesResult) => {
  console.log(result);
});
```

## API

#### Source

| Property | Type     | Description         | Required? |
| -------- | -------- | ------------------- | --------- |
| `name`   | `String` | A source identifier | Yes       |

| Function    | Parameters                      | Description                                                                  | Returns                              |
| ----------- | ------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| `getArtist` | `options`: `MusicSearchOptions` | Searches for `Artist` metadata with corresponding `Album` and `Song` objects | `Promise<SourceResult<MusicResult>>` |
| `getAlbum`  | `options`: `MusicSearchOptions` | Searches for `Album` metadata with corresponding `Artist` and `Song` objects | `Promise<SourceResult<MusicResult>>` |
| `getSong`   | `options`: `MusicSearchOptions` | Searches for `Song` metadata with corresponding `Artist` and `Album` objects | `Promise<SourceResult<MusicResult>>` |

#### MusicSearchOptions

| Property      | Type            | Description                                                                                                                                                                                                                                                                                                                  | Required? |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `query`       | `String`        | A word/phrase to search for                                                                                                                                                                                                                                                                                                  | Yes       |
| `sources`     | `Array<Source>` | An `Array` of `Source`s to use during searches                                                                                                                                                                                                                                                                               | Yes       |
| `artistLimit` | `Number`        | The maximum number of `Artist`s to retrieve.                                                                                                                                                                                                                                                                                 | No        |
| `albumLimit`  | `Number`        | The maximum number of `Album`s to retrieve. Please note that for the `getAlbum` this indicates the maximum number of `Album`s to return. However, for the `getArtist` function, this means number of `Album`s PER `Artist`.                                                                                                  | No        |
| `songLimit`   | `Number`        | The maximum number of `Song`s to retrieve. Please note that for the `getSong` this indicates the maximum number of `Song`s to return. However, for the `getArtist` function, this means number of songs PER `Artist`. Similarly, this number represents the total number of `Song`s PER `Album` for the `getAlbum` function. | No        |

#### MusicSearch

| Function    | Parameters                      | Description                                                                                                                               | Returns                              |
| ----------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `getArtist` | `options`: `MusicSearchOptions` | Searches `Sources` from `MusicSearchOptions` and returns a `MusicResult` containing `Artist` and corresponding `Album` and `Song` objects | `Promise<SourceResult<MusicResult>>` |
| `getAlbum`  | `options`: `MusicSearchOptions` | Searches `Sources` from `MusicSearchOptions` and returns a `MusicResult` containing `Album` and corresponding `Artist` and `Song` objects | `Promise<SourceResult<MusicResult>>` |
| `getSong`   | `options`: `MusicSearchOptions` | Searches `Sources` from `MusicSearchOptions` and returns a `MusicResult` containing `Song` and corresponding `Artist` and `Album` objects | `Promise<SourceResult<MusicResult>>` |
