// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {
  MusicSearch,
  MusicAlbumQuery,
  MusicResult,
  ItunesSearchSource
} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Album Search", async () => {
      expect.assertions(5);

      const options: MusicAlbumQuery = {
        query: "Villains qotsa",
        sources: [new ItunesSearchSource()],

        albumLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getAlbum(options);

      // Result Count
      expect(sourceResults.length).toBeGreaterThan(0);

      // Music Artist(s)/Album(s)/Song(s) Result Count
      expect(sourceResults[0].artists.length).toBeLessThan(1);
      expect(sourceResults[0].albums.length).toBeGreaterThan(0);
      expect(sourceResults[0].songs.length).toBeLessThan(1);

      // Artist/Album ID Defined
      expect(sourceResults[0].albums[0].artistId).toBeUndefined();
    });

    test("Album Search with Artist", async () => {
      expect.assertions(5);

      const options: MusicAlbumQuery = {
        query: "Villains qotsa",
        sources: [new ItunesSearchSource()],

        includeArtist: true,
        albumLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getAlbum(options);

      // Result Count
      expect(sourceResults.length).toBeGreaterThan(0);

      // Music Artist(s)/Album(s)/Song(s) Result Count
      expect(sourceResults[0].artists.length).toEqual(1);
      expect(sourceResults[0].albums.length).toBeGreaterThan(0);
      expect(sourceResults[0].songs.length).toBeLessThan(1);

      // Artist/Album ID Defined
      expect(sourceResults[0].albums[0].artistId).toBeDefined();
    });

    test("Album Search with Songs", async () => {
      expect.assertions(7);

      const options: MusicAlbumQuery = {
        query: "Villains qotsa",
        sources: [new ItunesSearchSource()],

        includeSongs: true,
        albumLimit: 1,
        songLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getAlbum(options);

      // Result Count
      expect(sourceResults.length).toBeGreaterThan(0);

      // Music Artist(s)/Album(s)/Song(s) Result Count
      expect(sourceResults[0].artists.length).toBeLessThan(1);
      expect(sourceResults[0].albums.length).toBeGreaterThan(0);
      expect(sourceResults[0].songs.length).toBeGreaterThan(0);

      // Artist/Album ID Defined
      expect(sourceResults[0].albums[0].artistId).toBeUndefined();
      expect(sourceResults[0].songs[0].artistId).toBeUndefined();
      expect(sourceResults[0].songs[0].albumId).toBeDefined();
    });

    test("Album Search with Artist and Songs", async () => {
      expect.assertions(7);

      const options: MusicAlbumQuery = {
        query: "Villains qotsa",
        sources: [new ItunesSearchSource()],

        includeArtist: true,
        includeSongs: true,
        albumLimit: 1,
        songLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getAlbum(options);

      // Result Count
      expect(sourceResults.length).toBeGreaterThan(0);

      // Music Artist(s)/Album(s)/Song(s) Result Count
      expect(sourceResults[0].artists.length).toEqual(1);
      expect(sourceResults[0].albums.length).toBeGreaterThan(0);
      expect(sourceResults[0].songs.length).toBeGreaterThan(0);

      // Artist/Album ID Defined
      expect(sourceResults[0].albums[0].artistId).toBeDefined();
      expect(sourceResults[0].songs[0].artistId).toBeDefined();
      expect(sourceResults[0].songs[0].albumId).toBeDefined();
    });
  });
});
