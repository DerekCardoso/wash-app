import { useState, useCallback } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../constants/firebase';
import { Rating } from '../types';

export const useRatings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addRating = useCallback(async (rating: Omit<Rating, 'id' | 'createdAt'>) => {
    setLoading(true);
    setError(null);

    try {
      const ratingRef = doc(collection(db, 'ratings'));
      await setDoc(ratingRef, {
        ...rating,
        id: ratingRef.id,
        createdAt: new Date()
      });

      // Atualiza a média de avaliações do lava-rápido
      const carWashRef = doc(db, 'carWashes', rating.carWashId);
      const carWashDoc = await getDoc(carWashRef);
      
      if (carWashDoc.exists()) {
        const carWashData = carWashDoc.data();
        const totalRatings = (carWashData.totalRatings || 0) + 1;
        const newRating = ((carWashData.rating || 0) * (totalRatings - 1) + rating.score) / totalRatings;
        
        await updateDoc(carWashRef, {
          rating: newRating,
          totalRatings
        });
      }

      return ratingRef.id;
    } catch (err) {
      setError('Erro ao adicionar avaliação');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCarWashRatings = useCallback(async (carWashId: string) => {
    setLoading(true);
    setError(null);

    try {
      const ratingsQuery = query(
        collection(db, 'ratings'),
        where('carWashId', '==', carWashId),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(ratingsQuery);
      return snapshot.docs.map(doc => doc.data() as Rating);
    } catch (err) {
      setError('Erro ao buscar avaliações do lava-rápido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCustomerRatings = useCallback(async (customerId: string) => {
    setLoading(true);
    setError(null);

    try {
      const ratingsQuery = query(
        collection(db, 'ratings'),
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(ratingsQuery);
      return snapshot.docs.map(doc => doc.data() as Rating);
    } catch (err) {
      setError('Erro ao buscar avaliações do cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    addRating,
    getCarWashRatings,
    getCustomerRatings
  };
}; 