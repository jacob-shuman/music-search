# music-search [![npm](https://img.shields.io/npm/v/music-search.svg)](https://www.npmjs.com/package/music-search) [![Build Status](https://travis-ci.org/jacob-shuman/music-search.svg?branch=master)](https://travis-ci.org/jacob-shuman/music-search)

> A music metadata search utility package for Node JS.

## What?

`music-search` is a utility for searching a variety of music metadata sources. This is helpful when in need of music artist/album/song data such as titles, album art, genre, etc.

- [**Installation**](#installation)
- [**Importing**](#importing)
- [**Available Sources**](#sources)
- [**API**](#api)
  - [Interfaces](./docs/interfaces.md)
  - [Namespaces](./docs/namespaces.md)
  - [Classes](./docs/classes.md)
  - [Functions](./docs/functions.md)

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
- [**Classes**](./docs/classes.md)
- [**Functions**](./docs/functions.md)
