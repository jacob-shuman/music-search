// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {MusicSearch, MusicSongQuery, MusicResult, ItunesSearchSource} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Song Search", async () => {
      const options: MusicSongQuery = {
        query: "Queen Bohemian Rhapsody",
        songSearchLimit: 1,
        sources: [new ItunesSearchSource()]
      };

      const sourceResults: MusicResult[] = await MusicSearch.getSong(options);

      expect(sourceResults.length).toBeGreaterThan(0);
    });
  });
});

// there was a sheep herder and he crose\sed a road with 2 sheep and a wolf  and he arrives a t a bridge how does get them accross the bridge without the wolf eating the sheep tell me how?
