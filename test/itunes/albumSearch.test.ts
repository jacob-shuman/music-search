// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {MusicSearch, AlbumMusicQuery, MusicResult, ItunesSearchSource} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Album Search", async () => {
      const options: AlbumMusicQuery = {
        query: "Villains qotsa",
        albumSearchLimit: 1,
        sources: [new ItunesSearchSource()]
      };

      const sourceResults: MusicResult[] = await MusicSearch.getAlbum(options);

      console.log(sourceResults[0].artists);
      console.log(sourceResults[0].albums);
      console.log(sourceResults[0].songs);

      expect(sourceResults.length).toBeGreaterThan(0);
    });
  });
});
