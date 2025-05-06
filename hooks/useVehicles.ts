import { useState, useCallback } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../constants/firebase';
import { Vehicle } from '../types';

export const useVehicles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addVehicle = useCallback(async (vehicle: Omit<Vehicle, 'id'>) => {
    setLoading(true);
    setError(null);

    try {
      const vehicleRef = doc(collection(db, 'vehicles'));
      await setDoc(vehicleRef, {
        ...vehicle,
        id: vehicleRef.id
      });

      return vehicleRef.id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao adicionar veículo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateVehicle = useCallback(async (vehicleId: string, data: Partial<Vehicle>) => {
    setLoading(true);
    setError(null);

    try {
      const vehicleRef = doc(db, 'vehicles', vehicleId);
      await updateDoc(vehicleRef, data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar veículo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getVehicle = useCallback(async (vehicleId: string) => {
    setLoading(true);
    setError(null);

    try {
      const vehicleDoc = await getDoc(doc(db, 'vehicles', vehicleId));
      if (!vehicleDoc.exists()) {
        throw new Error('Veículo não encontrado');
      }
      return vehicleDoc.data() as Vehicle;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar veículo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCustomerVehicles = useCallback(async (customerId: string) => {
    setLoading(true);
    setError(null);

    try {
      const vehiclesQuery = query(
        collection(db, 'vehicles'),
        where('ownerId', '==', customerId)
      );
      
      const snapshot = await getDocs(vehiclesQuery);
      return snapshot.docs.map(doc => doc.data() as Vehicle);
    } catch (err) {
      setError('Erro ao buscar veículos do cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    addVehicle,
    updateVehicle,
    getVehicle,
    getCustomerVehicles
  };
}; 