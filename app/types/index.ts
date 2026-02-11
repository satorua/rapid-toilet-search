export type ToiletRank = 'S' | 'A' | 'B' | 'C' | 'D';

export interface Toilet {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    rank: ToiletRank;
    features: {
        accessible: boolean;
        washlet: boolean;
        baby_seat: boolean;
    };
}
