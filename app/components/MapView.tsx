'use client';

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { Toilet } from '@/app/types';
import React, { useState, useCallback } from 'react';

interface MapViewProps {
    userLocation: { lat: number; lng: number } | null;
    toilets: Toilet[];
    onToiletClick?: (toilet: Toilet) => void;
}

const containerStyle = {
    width: '100%',
    height: '100vh',
};

const defaultCenter = {
    lat: 35.6812, // Tokyo Station
    lng: 139.7671,
};

export default function MapView({ userLocation, toilets, onToiletClick }: MapViewProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds();
        if (userLocation) {
            bounds.extend(userLocation);
        }
        toilets.forEach(toilet => {
            bounds.extend({ lat: toilet.latitude, lng: toilet.longitude });
        });
        map.fitBounds(bounds);
        setMap(map);
    }, [userLocation, toilets]);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    if (!isLoaded) return <div className="h-screen w-full flex items-center justify-center bg-gray-100">Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || defaultCenter}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                zoomControl: false, // Cleaner UI for mobile
            }}
        >
            {/* User Location Marker */}
            {userLocation && (
                <MarkerF
                    position={userLocation}
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 7,
                        fillColor: '#4285F4',
                        fillOpacity: 1,
                        strokeColor: 'white',
                        strokeWeight: 2,
                    }}
                    zIndex={100}
                />
            )}

            {/* Toilet Markers */}
            {toilets.map((toilet) => (
                <MarkerF
                    key={toilet.id}
                    position={{ lat: toilet.latitude, lng: toilet.longitude }}
                    onClick={() => onToiletClick && onToiletClick(toilet)}
                    // Customize icon based on rank?
                    label={{
                        text: toilet.rank,
                        color: 'white',
                        className: 'font-bold',
                    }}
                />
            ))}
        </GoogleMap>
    );
}
