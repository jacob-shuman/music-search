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

// There was a sheep herder with 2 sheep.
// He arrives at a bridge with a wolf.
// The wolf will eat the sheep if left alone with either of them.
// He can move one animal at a time.

// How does he get all of the animals accross the bridge without the wolf eating the sheep?
// Tell me how?
