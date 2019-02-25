// 1 Minute Test Limit
jest.setTimeout(1000 * 60);

import {MusicSearch, MusicSongQuery, MusicResult, ItunesSearchSource} from "../../build/index";

describe("Source", () => {
  describe("Itunes", () => {
    test("Song Search", async () => {
      expect.assertions(4);

      const options: MusicSongQuery = {
        query: "Queen Bohemian Rhapsody",
        sources: [new ItunesSearchSource()],

        songLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getSong(options);

      expect(sourceResults.length).toBeGreaterThan(0);

      expect(sourceResults[0].artists.length).toBeLessThan(1);
      expect(sourceResults[0].albums.length).toBeLessThan(1);
      expect(sourceResults[0].songs.length).toBeGreaterThan(0);
    });

    test("Song Search with Artist", async () => {
      expect.assertions(4);

      const options: MusicSongQuery = {
        query: "Queen Bohemian Rhapsody",
        sources: [new ItunesSearchSource()],

        includeArtist: true,
        songLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getSong(options);

      expect(sourceResults.length).toBeGreaterThan(0);

      expect(sourceResults[0].artists.length).toEqual(1);
      expect(sourceResults[0].albums.length).toBeLessThan(1);
      expect(sourceResults[0].songs.length).toBeGreaterThan(0);
    });

    test("Song Search with Album", async () => {
      expect.assertions(4);

      const options: MusicSongQuery = {
        query: "Queen Bohemian Rhapsody",
        sources: [new ItunesSearchSource()],

        includeAlbum: true,
        songLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getSong(options);

      expect(sourceResults.length).toBeGreaterThan(0);

      expect(sourceResults[0].artists.length).toBeLessThan(1);
      expect(sourceResults[0].albums.length).toEqual(1);
      expect(sourceResults[0].songs.length).toBeGreaterThan(0);
    });

    test("Song Search with Album", async () => {
      expect.assertions(4);

      const options: MusicSongQuery = {
        query: "Queen Bohemian Rhapsody",
        sources: [new ItunesSearchSource()],

        includeArtist: true,
        includeAlbum: true,
        songLimit: 1
      };

      const sourceResults: MusicResult[] = await MusicSearch.getSong(options);

      expect(sourceResults.length).toBeGreaterThan(0);

      expect(sourceResults[0].artists.length).toEqual(1);
      expect(sourceResults[0].albums.length).toEqual(1);
      expect(sourceResults[0].songs.length).toBeGreaterThan(0);
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
