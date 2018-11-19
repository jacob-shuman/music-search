export interface Music {
    id: number;
    name: string;
}
export declare class Artist implements Music {
    id: number;
    name: string;
    constructor(options: {
        id?: number;
        name?: string;
    });
}
export declare class Album implements Music {
    id: number;
    name: string;
    trackCount: number;
    artistId: number;
    constructor(options: {
        id?: number;
        name?: string;
        trackCount?: number;
        artistId?: number;
    });
}
export declare class Song implements Music {
    id: number;
    name: string;
    track: number;
    duration: number;
    genre: string;
    artistId: number;
    albumId: number;
    constructor(options: {
        id?: number;
        name?: string;
        track?: number;
        duration?: number;
        genre?: string;
        artistId?: number;
        albumId?: number;
    });
}
