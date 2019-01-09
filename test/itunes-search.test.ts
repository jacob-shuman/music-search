// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {
  MusicSearch,
  SourceResult,
  MusicResult,
  ItunesSearchSource,
  MusicSearchOptions
} from "../src/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Artist Search", async () => {
      const options = {
        query: "Queens of the Stone Age",
        artistSourceLimit: 1,
        sources: [new ItunesSearchSource()]
      };

      const results = await MusicSearch.getArtist(options);

      expect(results.length).toBeGreaterThan(0);
    });

    test("Album Search", async () => {
      const options = {
        query: "Villains",
        albumSourceLimit: 2,
        sources: [new ItunesSearchSource()]
      };

      const results = await MusicSearch.getAlbum(options);

      expect(results.length).toBeGreaterThan(0);
    });

    test("Song Search", async () => {
      const options = {
        query: "Queen Bohemian Rhapsody",
        songSourceLimit: 1,
        sources: [new ItunesSearchSource()]
      };

      const results = await MusicSearch.getSong(options);

      expect(results.length).toBeGreaterThan(0);
    });
  });
});
