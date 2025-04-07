import { useState, useCallback } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../constants/firebase';
import { CarWash, Service, WorkingHours } from '../types';

export const useCarWash = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCarWash = useCallback(async (carWash: Omit<CarWash, 'id'>, ownerId: string) => {
    setLoading(true);
    setError(null);

    try {
      const carWashRef = doc(collection(db, 'carWashes'));
      await setDoc(carWashRef, {
        ...carWash,
        id: carWashRef.id,
        ownerId,
        rating: 0,
        totalRatings: 0,
        createdAt: new Date()
      });

      return carWashRef.id;
    } catch (err) {
      setError('Erro ao criar lava-rápido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCarWash = useCallback(async (carWashId: string, data: Partial<CarWash>) => {
    setLoading(true);
    setError(null);

    try {
      const carWashRef = doc(db, 'carWashes', carWashId);
      await updateDoc(carWashRef, data);
    } catch (err) {
      setError('Erro ao atualizar lava-rápido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCarWash = useCallback(async (carWashId: string) => {
    setLoading(true);
    setError(null);

    try {
      const carWashDoc = await getDoc(doc(db, 'carWashes', carWashId));
      if (!carWashDoc.exists()) {
        throw new Error('Lava-rápido não encontrado');
      }
      return carWashDoc.data() as CarWash;
    } catch (err) {
      setError('Erro ao buscar lava-rápido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getNearbyCarWashes = useCallback(async (latitude: number, longitude: number, radius: number = 5) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implementar busca por proximidade usando geohash
      const carWashesQuery = query(
        collection(db, 'carWashes'),
        orderBy('rating', 'desc')
      );
      
      const snapshot = await getDocs(carWashesQuery);
      return snapshot.docs.map(doc => doc.data() as CarWash);
    } catch (err) {
      setError('Erro ao buscar lava-rápidos próximos');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addService = useCallback(async (carWashId: string, service: Omit<Service, 'id' | 'carWashId'>) => {
    setLoading(true);
    setError(null);

    try {
      const serviceRef = doc(collection(db, 'carWashes', carWashId, 'services'));
      await setDoc(serviceRef, {
        ...service,
        id: serviceRef.id,
        carWashId
      });
    } catch (err) {
      setError('Erro ao adicionar serviço');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateWorkingHours = useCallback(async (carWashId: string, workingHours: WorkingHours[]) => {
    setLoading(true);
    setError(null);

    try {
      const carWashRef = doc(db, 'carWashes', carWashId);
      await updateDoc(carWashRef, { workingHours });
    } catch (err) {
      setError('Erro ao atualizar horários');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createCarWash,
    updateCarWash,
    getCarWash,
    getNearbyCarWashes,
    addService,
    updateWorkingHours
  };
};