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

**`id: number`**

**`name: string`**

**`artUrl: string | undefined`**

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

**`id: number`**

**`name: string`**

**`trackCount: number | undefined`**

**`artUrl: string | undefined`**

**`artistId: number | undefined`**

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

**`id: number`**

**`name: string`**

**`track: number | undefined`**

**`duration: number | undefined`**

**`genre: string | undefined`**

**`artistId: number | undefined`**

**`albumId: number | undefined`**

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

**`name: string`**

**`getArtist: (options: MusicArtistQuery) => Promise<MusicResult>`**

**`getAlbum: (options: MusicAlbumQuery) => Promise<MusicResult>`**

**`getSong: (options: MusicSongQuery) => Promise<MusicResult>`**

<a name="query">

## **Query**

</a>

### `MusicQuery`

```ts
interface MusicQuery {
  query: string;
  sources?: MusicSource[];
}
```

#### Members

**`query: string`**

**`sources: MusicSource[] | undefined`**

### `MusicArtistQuery` **extends** `MusicQuery`

```ts
interface MusicArtistQuery extends MusicQuery {
  includeAlbums?: boolean;
  includeSongs?: boolean;

  artistLimit?: number;
  albumLimit?: number;
  songLimit?: number;
}
```

#### Members

**`includeAlbums: boolean | undefined`**

**`includeSongs: boolean | undefined`**

**`artistLimit: number | undefined`**

**`albumLimit: number | undefined`**

**`songLimit: number | undefined`**

### `MusicAlbumQuery` **extends** `MusicQuery`

```ts
interface MusicAlbumQuery extends MusicQuery {
  includeArtist?: boolean;
  includeSongs?: boolean;

  albumLimit?: number;
  songLimit?: number;
}
```

#### Members

**`includeArtist: boolean | undefined`**

**`includeSongs: boolean | undefined`**

**`albumLimit: number | undefined`**

**`songLimit: number | undefined`**

### `MusicSongQuery extends MusicQuery`

```ts
interface MusicSongQuery extends MusicQuery {
  includeArtist?: boolean;
  includeAlbum?: boolean;

  songLimit?: number;
}
```

#### Members

**`includeArtist: boolean | undefined`**

**`includeAlbum: boolean | undefined`**

**`songLimit: number | undefined`**
