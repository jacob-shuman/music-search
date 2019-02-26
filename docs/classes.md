[Go Back to README](../README.md)

# Classes

### `MusicResult`

```ts
export class MusicResult {
  readonly artists: MusicArtist[];
  readonly albums: MusicAlbum[];
  readonly songs: MusicSong[];
  readonly source?: MusicSource;

  constructor(options: {
    artists?: MusicArtist[];
    albums?: MusicAlbum[];
    songs?: MusicSong[];
    source?: MusicSource;
  });

  getArtist(id: number): MusicArtist | undefined;
  getArtistAlbums(id: number): MusicAlbum[];
  getArtistSongs(id: number): MusicSong[];

  getAlbum(id: number): MusicAlbum | undefined;
  getAlbumSongs(id: number): MusicSong[];

  getSong(id: number): MusicSong | undefined;
}
```

#### Members

**`readonly artists: MusicArtist[]`**

**`readonly albums: MusicAlbum[]`**

**`readonly songs: MusicSong[]`**

**`readonly source: MusicSource | undefined`**

**`getArtist: (id: number) => MusicArtist | undefined`**

**`getArtistAlbums: (id: number) => MusicAlbum[]`**

**`getArtistSongs: (id: number) => MusicSong[]`**

**`getAlbum: (id: number) => MusicAlbum | undefined`**

**`getAlbumSongs: (id: number) => MusicSong[]`**

**`getSong: (id: number) => MusicSong | undefined`**
