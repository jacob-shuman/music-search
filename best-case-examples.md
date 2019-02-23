## Query

```ts
interface MusicQuery {
  query: string;

  artistSourceLimit?: number;
  albumSourceLimit?: number;
  songSourceLimit?: number;

  sources?: Array<Source>;
}
```

## Result

```ts
interface MusicResult {
  source: Source;

  artists: Array<Artist>;
  albums: Array<Album>;
  songs: Array<Song>;
}
```

## Simple Artist Search

```ts
const artistResults: MusicResult = MusicSearch.getArtist({query: "Queen"});
```

```ts
{
    source: ITUNES_SEARCH,
    artists: [],
    albums: [],
    songs: []
}
```

## Simple Album Search

```ts
const albumResults: MusicResult = MusicSearch.getAlbum({query: "Villains qotsa"});
```

```ts
{
    source: ITUNES_SEARCH,
    artists: [],
    albums: [],
    songs: []
}
```

## Simple Song Search

```ts
const songResults: MusicResult = MusicSearch.getAlbum({query: "ouch bring me the horizon"});
```

```ts
{
    source: ITUNES_SEARCH,
    artists: [],
    albums: [],
    songs: []
}
```
