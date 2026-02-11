import { ToiletRank } from '@/app/types';

interface RankBadgeProps {
    rank: ToiletRank;
}

const rankColors: Record<ToiletRank, string> = {
    S: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    A: 'bg-blue-100 text-blue-800 border-blue-300',
    B: 'bg-green-100 text-green-800 border-green-300',
    C: 'bg-gray-100 text-gray-800 border-gray-300',
    D: 'bg-red-100 text-red-800 border-red-300',
};

const rankLabels: Record<ToiletRank, string> = {
    S: 'S級 (ホテル級)',
    A: 'A級 (キレイ)',
    B: 'B級 (普通)',
    C: 'C級 (公衆)',
    D: 'D級 (緊急用)',
};

export default function RankBadge({ rank }: RankBadgeProps) {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${rankColors[rank]}`}>
            {rankLabels[rank]}
        </span>
    );
}
