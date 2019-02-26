# music-search [![npm](https://img.shields.io/npm/v/music-search.svg)](https://www.npmjs.com/package/music-search) [![Build Status](https://travis-ci.org/jacob-shuman/music-search.svg?branch=master)](https://travis-ci.org/jacob-shuman/music-search)

> A music metadata search utility package for Node JS.

**A note about v2.0.0**

This package was released in a broken state and for that I deeply apologize. The initial version should have been <1.0.0 to indicate the API was still being developed.

I believe that as of v2.0.0 the API feels stable enough to put the finishing touches on the iTunes Search API implementation and advance to the Spotify Web API.

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
- [**Contributing**](#contributing)

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

| Name              | Package(s) Used                                                            | Implemented     | Link                                                                                            |
| ----------------- | -------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------- |
| iTunes Search API | [**node-itunes-search**](https://www.npmjs.com/package/node-itunes-search) | Almost Complete | https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/ |
| Spotify API       |                                                                            | No              | https://developer.spotify.com/documentation/web-api/                                            |

<a name="api">

## API

</a>

- [**Interfaces**](./docs/interfaces.md)
- [**Namespaces**](./docs/namespaces.md)
- [**Classes**](./docs/classes.md)
- [**Functions**](./docs/functions.md)

<a name="contributing">

## Contributing

</a>

**Short Answer:** I would greatly appreciate any contribution.

I am a full time student, and have a couple other npm packages, so I don't have an unlimited amount of time.
That said I will try my best to be as quick as possible regarding any pull requests or issues.
