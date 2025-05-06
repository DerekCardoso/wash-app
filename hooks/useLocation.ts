import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface LocationState {
  latitude: number;
  longitude: number;
  address: string;
  error: string | null;
  loading: boolean;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: 0,
    longitude: 0,
    address: '',
    error: null,
    loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        // Solicita permissão de localização
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocation(prev => ({
            ...prev,
            error: 'Permissão de localização negada',
            loading: false,
          }));
          return;
        }

        // Obtém a localização atual
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        // Obtém o endereço a partir das coordenadas
        const addressResponse = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        const address = addressResponse[0]?.street
          ? `${addressResponse[0].street}, ${addressResponse[0].number || ''}`
          : 'Localização não disponível';

        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          address,
          error: null,
          loading: false,
        });
      } catch (error) {
        setLocation(prev => ({
          ...prev,
          error: 'Erro ao obter localização',
          loading: false,
        }));
      }
    })();
  }, []);

  return location;
} 