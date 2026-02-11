import { Toilet } from '@/app/types';

export const mockToilets: Toilet[] = [
    {
        id: '1',
        name: '渋谷ヒカリエ ShinQs',
        latitude: 35.6590,
        longitude: 139.7035,
        address: '渋谷区渋谷2-21-1',
        rank: 'S',
        features: { accessible: true, washlet: true, baby_seat: true },
    },
    {
        id: '2',
        name: '渋谷マークシティ',
        latitude: 35.6580,
        longitude: 139.6990,
        address: '渋谷区道玄坂1-12-1',
        rank: 'A',
        features: { accessible: true, washlet: true, baby_seat: true },
    },
    {
        id: '3',
        name: '宮下公園',
        latitude: 35.6620,
        longitude: 139.7020,
        address: '渋谷区神宮前6-20-10',
        rank: 'B',
        features: { accessible: true, washlet: false, baby_seat: false },
    },
    {
        id: '4',
        name: 'ハチ公前公衆トイレ',
        latitude: 35.6591,
        longitude: 139.7006,
        address: '渋谷区道玄坂2-1',
        rank: 'C',
        features: { accessible: false, washlet: false, baby_seat: false },
    },
    {
        id: '5',
        name: '新宿駅東口 公衆トイレ',
        latitude: 35.6910,
        longitude: 139.7010,
        address: '新宿区新宿3-38-1',
        rank: 'D',
        features: { accessible: false, washlet: false, baby_seat: false },
    },
];
