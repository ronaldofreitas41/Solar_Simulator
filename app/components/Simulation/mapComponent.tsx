'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { FaSearch } from 'react-icons/fa';

type Library = 'places';

const libraries: Library[] = ['places']; // Defina a constante libraries fora do componente

interface MapComponentProps {
    onLocationChange: (location: string) => void; // Função de callback para atualizar a localização
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationChange }) => {
    const [userLocation, setUserLocation] = useState({ lat: -19.8386, lng: -43.8605 });
    const [address, setAddress] = useState('');
    const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
    const autocompleteInputRef = useRef<HTMLInputElement>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries, // Use a constante libraries aqui
    });

    // Função para atualizar a localização e chamar o callback
    const updateLocation = (lat: number, lng: number) => {
        const newLocation = { lat, lng };
        setUserLocation(newLocation);
        onLocationChange(`Lat: ${lat}, Lon: ${lng}`); // Atualiza o campo de localização no componente pai
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    updateLocation(latitude, longitude); // Usa a função updateLocation
                },
                (error) => {
                    console.error('Erro ao obter localização:', error);
                }
            );
        }

        // Inicializa o Geocoder
        if (window.google) {
            setGeocoder(new window.google.maps.Geocoder());
        }
    }, []); // Remova onLocationChange das dependências

    useEffect(() => {
        if (isLoaded && autocompleteInputRef.current) {
            const autocompleteInstance = new window.google.maps.places.Autocomplete(autocompleteInputRef.current);
            autocompleteInstance.addListener('place_changed', () => {
                const place = autocompleteInstance.getPlace();
                if (place.geometry) {
                    const lat = place.geometry?.location?.lat() || 0;
                    const lng = place.geometry?.location?.lng() || 0;
                    // const { lat, lng } = place.geometry.location;
                    updateLocation(lat, lng); // Usa a função updateLocation
                } else {
                    alert('Localização não encontrada');
                }
            });
        }
    }, [isLoaded]); // Remova onLocationChange das dependências

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault(); // Impede a recarga da página
        if (geocoder && address) {
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                    const { lat, lng } = results[0].geometry.location;
                    updateLocation(lat(), lng()); // Usa a função updateLocation
                } else {
                    alert('Localização não encontrada');
                }
            });
        }
    };

    if (!isLoaded) return <p>Carregando mapa...</p>;

    return (
        <div style={{ height: '135%', width: '100%', position: 'relative' }}>
            <form
                onSubmit={handleSearch}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 10,
                    marginLeft: '30%',
                    display: 'flex', // Adiciona flexbox para alinhar os itens
                    alignItems: 'center', // Centraliza verticalmente
                }}
            >
                <input
                    ref={autocompleteInputRef}
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Digite o nome de um lugar"
                    style={{
                        color: 'black',
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '30px 0 0 30px', // Borda arredondada apenas à esquerda
                        border: '1px solid #ccc', // Adiciona borda para melhor visualização
                        width: '300px',
                        height: '40px', // Altura fixa para alinhar com o botão
                        outline: 'none', // Remove o contorno ao focar
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 15px', // Ajuste do padding para melhor proporção
                        backgroundColor: '#fff',
                        color: 'white',
                        borderRadius: '0 30px 30px 0', // Borda arredondada apenas à direita
                        border: '1px solid #ccc', // Adiciona borda para combinar com o input
                        borderLeft: 'none', // Remove a borda esquerda para unir com o input
                        height: '40px', // Altura fixa para alinhar com o input
                        cursor: 'pointer', // Adiciona cursor pointer para indicar que é clicável
                        display: 'flex', // Flexbox para centralizar o ícone
                        alignItems: 'center', // Centraliza verticalmente
                        justifyContent: 'center', // Centraliza horizontalmente
                    }}
                >
                    <FaSearch style={{ color: '#000', height: '20px', width: '20px' }} />
                </button>
            </form>
            <GoogleMap
                center={userLocation}
                zoom={15}
                mapContainerStyle={{ height: '100%', width: '100%' }}
                onClick={(e) => {
                    if (e.latLng) {
                        updateLocation(e.latLng.lat(), e.latLng.lng()); // Atualiza a localização ao clicar no mapa
                    }
                }}
            >
                <Marker position={userLocation} />
            </GoogleMap>
        </div>
    );
};

export default MapComponent;