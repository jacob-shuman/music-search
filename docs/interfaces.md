[Go Back to README](../README.md)

# Interfaces

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

### `MusicAlbum`

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
