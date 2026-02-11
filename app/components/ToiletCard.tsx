import { Toilet } from '@/app/types';
import RankBadge from './RankBadge';
import { Navigation, Accessibility, Baby } from 'lucide-react';

interface ToiletCardProps {
    toilet: Toilet;
    distance?: number; // in meters
    onClick?: () => void;
}

export default function ToiletCard({ toilet, distance, onClick }: ToiletCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl p-4 shadow-md active:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{toilet.name}</h3>
                <RankBadge rank={toilet.rank} />
            </div>

            <div className="flex items-center text-gray-500 text-sm mb-3">
                <Navigation className="w-4 h-4 mr-1" />
                <span>
                    {distance ? `${Math.round(distance)}m` : '距離不明'}
                </span>
                <span className="mx-2">•</span>
                <span className="line-clamp-1">{toilet.address}</span>
            </div>

            <div className="flex gap-2">
                {toilet.features.accessible && (
                    <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg" title="多目的トイレ">
                        <Accessibility className="w-4 h-4" />
                    </span>
                )}
                {toilet.features.baby_seat && (
                    <span className="p-1.5 bg-pink-50 text-pink-600 rounded-lg" title="おむつ交換台">
                        <Baby className="w-4 h-4" />
                    </span>
                )}
                {toilet.features.washlet && (
                    <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded-lg flex items-center">
                        W
                    </span>
                )}
            </div>
        </div>
    );
}
