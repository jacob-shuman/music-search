// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {MusicSearch, MusicArtistQuery, MusicResult, ItunesSearchSource} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Artist Search", async () => {
      const options: MusicArtistQuery = {
        query: "Queen",
        includeSongs: true,
        artistLimit: 2,
        songLimit: 10,
        sources: [new ItunesSearchSource()]
      };

      const sourceResults: MusicResult[] = await MusicSearch.getArtist(options);

      console.log(sourceResults[0].artists);
      console.log(sourceResults[0].albums);
      console.log(sourceResults[0].songs);

      expect(sourceResults.length).toBeGreaterThan(0);
    });
  });
});
