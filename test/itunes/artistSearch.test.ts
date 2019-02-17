// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {
  MusicSearch,
  SourceResult,
  MusicResult,
  ItunesSearchSource,
  MusicSearchOptions
} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Artist Search", async () => {
      const options: MusicSearchOptions = {
        query: "Queens of the Stone Age",
        artistSourceLimit: 2,
        albumSourceLimit: 2,
        songSourceLimit: 1,
        sources: [new ItunesSearchSource()]
      };

      const results = await MusicSearch.getArtist(options);

      expect(results.length).toBeGreaterThan(0);
    });
  });
});
