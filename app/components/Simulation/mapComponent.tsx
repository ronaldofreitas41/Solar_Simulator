'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

interface MapComponentProps {
    onLocationChange: (location: string) => void; // Função de callback para atualizar a localização
}

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState({ lat: -19.8386, lng: -43.8605 });
    const [address, setAddress] = useState('');
    const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
    const autocompleteInputRef = useRef<HTMLInputElement>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Substitua pela sua chave de API
        libraries: ['places'],
    });

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

        // Initialize the Geocoder
        if (window.google) {
            setGeocoder(new window.google.maps.Geocoder());
        }
    }, []);

    useEffect(() => {
        if (isLoaded && autocompleteInputRef.current) {
            const autocompleteInstance = new window.google.maps.places.Autocomplete(autocompleteInputRef.current);
            autocompleteInstance.addListener('place_changed', () => {
                const place = autocompleteInstance.getPlace();
                if (place.geometry) {
                    setUserLocation({
                        lat: place.geometry?.location?.lat() || 0,
                        lng: place.geometry?.location?.lng() || 0,
                    });
                } else {
                    alert('Localização não encontrada');
                }
            });
        }
    }, [isLoaded]);

    const handleSearch = () => {
        if (geocoder && address) {
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                    const { lat, lng } = results[0].geometry.location;
                    setUserLocation({ lat: lat(), lng: lng() });
                } else {
                    alert('Localização não encontrada');
                }
            });
        }
    };

    if (!isLoaded) return <p>Carregando mapa...</p>;

    return (
        <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
            <input
                ref={autocompleteInputRef}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Digite o nome de um lugar"
                style={{
                    color: 'black',
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '10px',
                    zIndex: 10,
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    position: 'absolute',
                    top: '60px',
                    left: '20px',
                    padding: '10px',
                    zIndex: 10,
                    backgroundColor: '#007bff',
                    color: 'white',
                    borderRadius: '5px',
                    border: 'none',
                }}
            >
                Buscar Localização
            </button>
            <GoogleMap
                center={userLocation}
                zoom={15}
                mapContainerStyle={{ height: '100%', width: '100%' }}
            >
                <Marker position={userLocation} />
            </GoogleMap>
        </div>
    );
};

export default MapComponent;