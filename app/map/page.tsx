'use client';

import { useEffect, useState } from 'react';
import MapView from '../components/MapView';
import { Toilet } from '../types';
import { mockToilets } from '../lib/mockData';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function MapPage() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!navigator.geolocation) {
            setLoading(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setLoading(false);
            },
            () => {
                setLoading(false);
            }
        );
    }, []);

    return (
        <div className="h-screen w-full relative">
            <Link href="/" className="absolute top-4 left-4 z-10 bg-white p-3 rounded-full shadow-lg">
                Back
            </Link>
            <MapView
                userLocation={location}
                toilets={mockToilets}
            />
        </div>
    );
}
