import {
  MusicSearch,
  MusicSearchOptions,
  SourceResult,
  MusicResult,
  ItunesSearchSource
} from "../src/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Artist Search", () => {
      expect.assertions(1);

      const options = new MusicSearchOptions({
        query: "Queens of the Stone Age",
        artistLimit: 1,
        albumLimit: 10,
        songLimit: 15,
        sources: [new ItunesSearchSource()]
      });

      return MusicSearch.getArtist(options).then(
        (musicResults: Array<SourceResult<MusicResult>>) => {
          return expect(musicResults.length).toBeGreaterThan(0);
        }
      );
    });

    test("Album Search", () => {
      expect.assertions(1);

      const options = new MusicSearchOptions({
        query: "Villains Qotsa",
        albumLimit: 1,
        sources: [new ItunesSearchSource()]
      });

      return MusicSearch.getAlbum(options).then(
        (musicResults: Array<SourceResult<MusicResult>>) => {
          return expect(musicResults.length).toBeGreaterThan(0);
        }
      );
    });

    test("Song Search", () => {
      expect.assertions(1);

      const options = new MusicSearchOptions({
        query: "Queen Bohemian Rhapsody",
        songLimit: 1,
        sources: [new ItunesSearchSource()]
      });

      return MusicSearch.getSong(options).then(
        (musicResults: Array<SourceResult<MusicResult>>) => {
          return expect(musicResults.length).toBeGreaterThan(0);
        }
      );
    });
  });
});
