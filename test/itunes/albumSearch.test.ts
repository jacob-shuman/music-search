import {
  MusicSearch,
  SourceResult,
  MusicResult,
  ItunesSearchSource,
  MusicSearchOptions
} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Album Search", async () => {
      const options: MusicSearchOptions = {
        query: "Villains",
        artistSourceLimit: 1,
        albumSourceLimit: 5,
        sources: [new ItunesSearchSource()]
      };

      const results = await MusicSearch.getAlbum(options);

      expect(results.length).toBeGreaterThan(0);
    });
  });
});
