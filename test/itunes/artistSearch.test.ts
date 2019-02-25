// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {MusicSearch, MusicArtistQuery, MusicResult, ItunesSearchSource} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Artist Search", async () => {
      const options: MusicArtistQuery = {
        query: "Queen",
        sources: [new ItunesSearchSource()]
      };

      const sourceResults: MusicResult[] = await MusicSearch.getArtist(options);

      expect(sourceResults.length).toBeGreaterThan(0);
    });

    test("Artist Search with Albums", async () => {
      const options: MusicArtistQuery = {
        query: "Queen",
        sources: [new ItunesSearchSource()]
      };

      const sourceResults: MusicResult[] = await MusicSearch.getArtist(options);

      expect(sourceResults.length).toBeGreaterThan(0);
    });

    test("Artist Search with Songs", async () => {
      const options: MusicArtistQuery = {
        query: "Queen",
        sources: [new ItunesSearchSource()]
      };

      const sourceResults: MusicResult[] = await MusicSearch.getArtist(options);

      expect(sourceResults.length).toBeGreaterThan(0);
    });

    test("Artist Search with Albums && Songs)", async () => {
      const options: MusicArtistQuery = {
        query: "Queen",
        sources: [new ItunesSearchSource()]
      };

      const sourceResults: MusicResult[] = await MusicSearch.getArtist(options);

      expect(sourceResults.length).toBeGreaterThan(0);
    });
  });
});
