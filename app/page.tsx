'use client';

import { useEffect, useState } from 'react';
import { Toilet } from './types';
import { mockToilets } from './lib/mockData';
import { calculateDistance } from './lib/utils'; // renamed from googleMaps.ts
import ToiletCard from './components/ToiletCard';
import ActionButton from './components/ActionButton';
import { MapPin, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyToilets, setNearbyToilets] = useState<{ toilet: Toilet; distance: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocationAndSearch = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('お使いのブラウザは位置情報をサポートしていません');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });

        // Calculate distances
        const sorted = mockToilets
          .map((toilet) => {
            // Note: utils.ts calculateDistance signature: lat1, lon1, lat2, lon2
            // Wait, I need to check my utils implementation. 
            // calculateDistance = (lat1, lon1, lat2, lon2)
            const dist = (typeof calculateDistance === 'function')
              ? calculateDistance(latitude, longitude, toilet.latitude, toilet.longitude)
              : 0;
            return { toilet, distance: dist };
          })
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3);

        setNearbyToilets(sorted);
        setLoading(false);
      },
      (err) => {
        setError('位置情報の取得に失敗しました。設定を確認してください。');
        setLoading(false);
        // Fallback: show unfiltered or default toilets?
        // For MVP, show list sorted by default (mock)
        const sorted = mockToilets.map(t => ({ toilet: t, distance: 0 })).slice(0, 3);
        setNearbyToilets(sorted);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    getLocationAndSearch();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-2xl font-black italic tracking-tighter flex items-center">
          <AlertCircle className="mr-2 h-6 w-6" />
          爆速トイレ検索
        </h1>
      </header>

      <div className="p-4 max-w-md mx-auto space-y-6">

        {/* Status / Error */}
        {error && (
          <div className="bg-yellow-50 border-1-4 border-yellow-400 p-4 mb-4 text-yellow-700 text-sm rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="font-bold text-gray-500 animate-pulse">現在地から爆速検索中...</p>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <MapPin className="mr-1 text-red-600" />
                最寄りのトイレ 3選
              </h2>
              <div className="space-y-4">
                {nearbyToilets.map(({ toilet, distance }) => (
                  <ToiletCard
                    key={toilet.id}
                    toilet={toilet}
                    distance={distance}
                  />
                ))}
              </div>
            </section>

            <div className="pt-4 space-y-3">
              <Link href="/map" className="block">
                <ActionButton variant="primary">
                  地図で見る
                </ActionButton>
              </Link>
              <ActionButton variant="secondary" onClick={getLocationAndSearch}>
                <RefreshCw className="w-5 h-5 mr-1" />
                再検索
              </ActionButton>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
