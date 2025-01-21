'use client';
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState({ lat: -19.8386, lng: -43.8605 }); // Localização inicial padrão
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '', // Substitua pela sua chave
    });

    // Obter localização do usuário
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Erro ao obter localização:', error);
                }
            );
        }
    }, []);

    if (!isLoaded) return <p>Carregando mapa...</p>;

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMap
                center={userLocation}
                zoom={15}
                mapContainerStyle={{ height: '100%', width: '100%' }}
            >
                <Marker position={userLocation} />
            </GoogleMap>
        </div>
    );
}

export default MapComponent;
