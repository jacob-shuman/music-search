import { MusicSearch, SourceResult, MusicResult, ItunesSearchSource } from "../src/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Artist Search", async () => {
      expect.assertions(1);

      const options = {
        query: "Queens of the Stone Age",
        artistLimit: 1,
        albumLimit: 10,
        songLimit: 15,
        sources: [new ItunesSearchSource()]
      };

      const results = await MusicSearch.getArtist(options);

      expect(results.length).toBeGreaterThan(0);
    });

    test("Album Search", async () => {
      expect.assertions(1);

      const options = {
        query: "Villains Qotsa",
        albumLimit: 1,
        sources: [new ItunesSearchSource()]
      };

      const results = await MusicSearch.getAlbum(options);

      expect(results.length).toBeGreaterThan(0);
    });

    test("Song Search", async () => {
      expect.assertions(1);

      const options = {
        query: "Queen Bohemian Rhapsody",
        songLimit: 1,
        sources: [new ItunesSearchSource()]
      };

      const results = await MusicSearch.getSong(options);

      expect(results.length).resolves.toBeGreaterThan(0);
    });
  });
});
