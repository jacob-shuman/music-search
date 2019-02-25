// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {MusicSearch, MusicAlbumQuery, MusicResult, ItunesSearchSource} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Album Search", async () => {
      const options: MusicAlbumQuery = {
        query: "Villains qotsa",
        includeArtist: true,
        includeSongs: true,
        albumLimit: 1,
        sources: [new ItunesSearchSource()]
      };

      const sourceResults: MusicResult[] = await MusicSearch.getAlbum(options);

      expect(sourceResults.length).toBeGreaterThan(0);
    });
  });
});
