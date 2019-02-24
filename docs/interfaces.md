[Go Back to README](../README.md)

# Interfaces

- [Music](#music)
- [Source](#source)
- [Query](#query)

<a name="music">

## **Music**

</a>

### `MusicArtist`

```ts
interface MusicArtist {
  id: number;
  name: string;

  artUrl?: string;
}
```

#### Members

**id: `number`**

**name: `string`**

**artUrl: `string | undefined`**

### `MusicAlbum`

```ts
interface MusicAlbum {
  id: number;
  name: string;

  trackCount?: number;
  artUrl?: string;
  artistId?: number;
}
```

#### Members

**id: `number`**

**name: `string`**

**trackCount: `number | undefined`**

**artUrl: `string | undefined`**

**artistId: `number | undefined`**

### `MusicSong`

```ts
interface MusicSong {
  id: number;
  name: string;

  track?: number;

  duration?: number;

  genre?: string;

  artistId?: number;
  albumId?: number;
}
```

#### Members

**id: `number`**

**name: `string`**

**track: `number | undefined`**

**duration: `number | undefined`**

**genre: `string | undefined`**

**artistId: `number | undefined`**

**albumId: `number | undefined`**

<a name="source">

## **Source**

</a>

### `MusicSource`

```ts
interface MusicSource {
  name: string;

  getArtist: (options: MusicArtistQuery) => Promise<MusicResult>;
  getAlbum: (options: MusicAlbumQuery) => Promise<MusicResult>;
  getSong: (options: MusicSongQuery) => Promise<MusicResult>;
}
```

#### Members

**name: `string`**

**getArtist: (options: `MusicArtistQuery`) => `Promise`<`MusicResult`>**

**getAlbum: (options: `MusicAlbumQuery`) => `Promise`<`MusicResult`>**

**getSong: (options: `MusicSongQuery`) => `Promise`<`MusicResult`>**

<a name="query">

## **Query**

</a>

### `MusicQuery`

```ts
interface MusicQuery {
  query: string;
  sources?: MusicSource[];

  artistSourceLimit?: number;
  albumSourceLimit?: number;
  songSourceLimit?: number;
}
```

#### Members

**query: `string`**

**sources: `MusicSource[] | undefined`**

**artistSourceLimit: `number | undefined`**

**albumSourceLimit: `number | undefined`**

**songSourceLimit: `number | undefined`**

### `MusicArtistQuery` **extends** `MusicQuery`

```ts
interface MusicArtistQuery extends MusicQuery {
  artistSearchLimit?: number;
  albumSearchLimit?: number;
  songSearchLimit?: number;
}
```

#### Members

**artistSearchLimit: `number | undefined`**

**albumSearchLimit: `number | undefined`**

**songSearchLimit: `number | undefined`**

### `MusicAlbumQuery` **extends** `MusicQuery`

```ts
interface MusicAlbumQuery extends MusicQuery {
  albumSearchLimit?: number;
  songSearchLimit?: number;
}
```

#### Members

**albumSearchLimit: `number | undefined`**

**songSearchLimit: `number | undefined`**

### `MusicSongQuery` **extends** `MusicQuery`

```ts
interface MusicSongQuery extends MusicQuery {
  songSearchLimit?: number;
}
```

#### Members

**songSearchLimit: `number | undefined`**
