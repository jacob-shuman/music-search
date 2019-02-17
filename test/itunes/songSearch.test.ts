import {
  MusicSearch,
  SourceResult,
  MusicResult,
  ItunesSearchSource,
  MusicSearchOptions
} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
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
