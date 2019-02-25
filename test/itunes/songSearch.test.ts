// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {MusicSearch, MusicSongQuery, MusicResult, ItunesSearchSource} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Song Search", async () => {
      const options: MusicSongQuery = {
        query: "Queen Bohemian Rhapsody",
        includeArtist: true,
        includeAlbum: true,
        songLimit: 2,
        sources: [new ItunesSearchSource()]
      };

      const sourceResults: MusicResult[] = await MusicSearch.getSong(options);

      expect(sourceResults.length).toBeGreaterThan(0);
    });
  });
});

// Riddle me this...

// There was a sheep herder and he crosesed a road with 2 sheep and a wolf.
// He arrives at a bridge.
// He can move one animal at a time.
// The wolf will eat the sheep if left alone with either of them.

// How does get the animals accross the bridge without the wolf eating the sheep?
// Tell me how?
