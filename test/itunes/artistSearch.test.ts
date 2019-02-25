// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {MusicSearch, MusicArtistQuery, MusicResult, ItunesSearchSource} from "../../build/index";
import {AssertionError} from "assert";

describe("Source", () => {
  describe("Itunes", () => {
    test("Artist Search", async () => {
      expect.assertions(4);

      const options: MusicArtistQuery = {
        query: "Queen",
        sources: [new ItunesSearchSource()],

        artistLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getArtist(options);

      expect(sourceResults.length).toBeGreaterThan(0);

      expect(sourceResults[0].artists.length).toBeGreaterThan(0);
      expect(sourceResults[0].albums.length).toBeLessThan(1);
      expect(sourceResults[0].songs.length).toBeLessThan(1);
    });

    test("Artist Search with Albums", async () => {
      expect.assertions(4);

      const options: MusicArtistQuery = {
        query: "Queen",
        sources: [new ItunesSearchSource()],

        includeAlbums: true,
        artistLimit: 1,
        albumLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getArtist(options);

      expect(sourceResults.length).toBeGreaterThan(0);

      expect(sourceResults[0].artists.length).toBeGreaterThan(0);
      expect(sourceResults[0].albums.length).toBeGreaterThan(0);
      expect(sourceResults[0].songs.length).toBeLessThan(1);
    });

    test("Artist Search with Songs", async () => {
      expect.assertions(4);

      const options: MusicArtistQuery = {
        query: "Queen",
        sources: [new ItunesSearchSource()],

        includeSongs: true,
        artistLimit: 1,
        songLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getArtist(options);

      expect(sourceResults.length).toBeGreaterThan(0);

      expect(sourceResults[0].artists.length).toBeGreaterThan(0);
      expect(sourceResults[0].albums.length).toBeLessThan(1);
      expect(sourceResults[0].songs.length).toBeGreaterThan(0);
    });

    test("Artist Search with Albums and Songs", async () => {
      expect.assertions(4);

      const options: MusicArtistQuery = {
        query: "Queen",
        sources: [new ItunesSearchSource()],

        includeAlbums: true,
        includeSongs: true,
        artistLimit: 1,
        albumLimit: 1,
        songLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getArtist(options);

      expect(sourceResults.length).toBeGreaterThan(0);

      expect(sourceResults[0].artists.length).toBeGreaterThan(0);
      expect(sourceResults[0].albums.length).toBeGreaterThan(0);
      expect(sourceResults[0].songs.length).toBeGreaterThan(0);
    });
  });
});
