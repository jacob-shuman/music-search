# music-search [![npm](https://img.shields.io/npm/v/music-search.svg)](https://www.npmjs.com/package/music-search) [![Build Status](https://travis-ci.org/jacob-shuman/music-search.svg?branch=master)](https://travis-ci.org/jacob-shuman/music-search)

> A music metadata search utility package for Node JS.

## What?

`music-search` is a utility for searching a variety of music metadata sources. This is helpful when in need of music artist/album/song data such as titles, album art, genre, etc.

- [**Installation**](#installation)
- [**Importing**](#importing)
- [**AvailableSources**](#sources)
- [**API**](#api)
  - [Interfaces](./docs/interfaces.md)
  - [Namespaces](./docs/namespaces.md)

<a name="installation">

## Installation

</a>

```bash
$ npm install music-search
```

<a name="importing">

## Importing

</a>

#### Commonjs

```ts
const musicSearch = require("music-search");
```

#### ES6

```ts
import {MusicSearch} from "music-search";
```

#### Default Namespace

```ts
import MusicSearch from "music-search";
```

<a name="sources">

## Available Sources

</a>

| Name              | Package(s) Used                                                            | Implemented | Link                                                                                            |
| ----------------- | -------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| iTunes Search API | [**node-itunes-search**](https://www.npmjs.com/package/node-itunes-search) | In Progress | https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/ |
| Spotify API       |                                                                            | No          | https://developer.spotify.com/documentation/web-api/                                            |

<a name="api">

## API

</a>

- [**Interfaces**](./docs/interfaces.md)
- [**Namespaces**](./docs/namespaces.md)

  <!-- #### Source

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
| `getSong`   | `options`: `MusicSearchOptions` | Searches `Sources` from `MusicSearchOptions` and returns a `MusicResult` containing `Song` and corresponding `Artist` and `Album` objects | `Promise<SourceResult<MusicResult>>` | --> |
