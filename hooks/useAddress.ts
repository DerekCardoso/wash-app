import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import axios from 'axios';
import { Address, AddressValidation } from '@/types/address';
import { searchByCep } from '@/services/viaCep';

const STORAGE_KEY = '@wash:addresses';

export function useAddress() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const storedAddresses = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      }
    } catch (err) {
      console.error('Erro ao carregar endereços:', err);
      setError('Erro ao carregar endereços');
    } finally {
      setLoading(false);
    }
  };

  const saveAddress = useCallback(async (address: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      const newAddress: Address = {
        ...address,
        id: Math.random().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAddresses(prev => [...prev, newAddress]);
    } catch (err) {
      setError('Erro ao salvar endereço');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAddress = async (id: string, address: Partial<Address>) => {
    try {
      const updatedAddresses = addresses.map(addr => 
        addr.id === id 
          ? { ...addr, ...address, updatedAt: new Date() }
          : addr
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAddresses));
      setAddresses(updatedAddresses);
    } catch (err) {
      console.error('Erro ao atualizar endereço:', err);
      setError('Erro ao atualizar endereço');
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      const updatedAddresses = addresses.filter(addr => addr.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAddresses));
      setAddresses(updatedAddresses);
    } catch (err) {
      console.error('Erro ao deletar endereço:', err);
      setError('Erro ao deletar endereço');
    }
  };

  const getAddressById = (id: string) => {
    return addresses.find(addr => addr.id === id);
  };

  const getCurrentLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permissão de localização negada');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (response[0]) {
        const { street, district, city, region } = response[0];
        return {
          street: street || '',
          number: '',
          complement: '',
          neighborhood: district || '',
          city: city || '',
          state: region || '',
        };
      }
      return null;
    } catch (err) {
      setError('Erro ao obter localização');
      return null;
    }
  }, []);

  const searchByZipCode = useCallback(async (zipCode: string) => {
    setLoading(true);
    try {
      const result = await searchByCep(zipCode);
      if (!result) {
        throw new Error('CEP não encontrado');
      }
      return result;
    } catch (err) {
      setError('Erro ao buscar CEP');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const validateAddress = useCallback((address: Address): AddressValidation => {
    const errors: Record<string, string> = {};
    
    if (!address.street) errors.street = 'Rua é obrigatória';
    if (!address.number) errors.number = 'Número é obrigatório';
    if (!address.neighborhood) errors.neighborhood = 'Bairro é obrigatório';
    if (!address.city) errors.city = 'Cidade é obrigatória';
    if (!address.state) errors.state = 'Estado é obrigatório';
    if (!address.zipCode) errors.zipCode = 'CEP é obrigatório';
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }, []);

  return {
    addresses,
    loading,
    error,
    saveAddress,
    updateAddress,
    deleteAddress,
    getAddressById,
    getCurrentLocation,
    searchByZipCode,
    validateAddress,
  };
} 