import { Music } from "./music";
export declare class Song implements Music {
    name: string;
    track: number;
    duration: number;
    genre: string;
    constructor(options: {
        name?: string;
        track?: number;
        duration?: number;
        genre?: string;
    });
}
