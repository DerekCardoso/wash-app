import { useState, useCallback } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../constants/firebase';
import { LoyaltyProgram, CustomerLoyalty } from '../types';

export const useLoyalty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLoyaltyProgram = useCallback(async (program: Omit<LoyaltyProgram, 'id'>) => {
    setLoading(true);
    setError(null);

    try {
      const programRef = doc(collection(db, 'loyaltyPrograms'));
      await setDoc(programRef, {
        ...program,
        id: programRef.id
      });

      return programRef.id;
    } catch (err) {
      setError('Erro ao criar programa de fidelidade');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLoyaltyProgram = useCallback(async (programId: string, data: Partial<LoyaltyProgram>) => {
    setLoading(true);
    setError(null);

    try {
      const programRef = doc(db, 'loyaltyPrograms', programId);
      await updateDoc(programRef, data);
    } catch (err) {
      setError('Erro ao atualizar programa de fidelidade');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLoyaltyProgram = useCallback(async (carWashId: string) => {
    setLoading(true);
    setError(null);

    try {
      const programQuery = query(
        collection(db, 'loyaltyPrograms'),
        where('carWashId', '==', carWashId)
      );
      
      const snapshot = await getDocs(programQuery);
      if (snapshot.empty) {
        return null;
      }
      return snapshot.docs[0].data() as LoyaltyProgram;
    } catch (err) {
      setError('Erro ao buscar programa de fidelidade');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addCustomerPoints = useCallback(async (customerId: string, carWashId: string, points: number) => {
    setLoading(true);
    setError(null);

    try {
      const loyaltyQuery = query(
        collection(db, 'customerLoyalty'),
        where('customerId', '==', customerId),
        where('carWashId', '==', carWashId)
      );
      
      const snapshot = await getDocs(loyaltyQuery);
      let loyaltyRef;

      if (snapshot.empty) {
        loyaltyRef = doc(collection(db, 'customerLoyalty'));
        await setDoc(loyaltyRef, {
          id: loyaltyRef.id,
          customerId,
          carWashId,
          points,
          lastUpdate: new Date()
        });
      } else {
        const loyaltyDoc = snapshot.docs[0];
        loyaltyRef = doc(db, 'customerLoyalty', loyaltyDoc.id);
        const currentPoints = loyaltyDoc.data().points;
        await updateDoc(loyaltyRef, {
          points: currentPoints + points,
          lastUpdate: new Date()
        });
      }

      return loyaltyRef.id;
    } catch (err) {
      setError('Erro ao adicionar pontos');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCustomerLoyalty = useCallback(async (customerId: string, carWashId: string) => {
    setLoading(true);
    setError(null);

    try {
      const loyaltyQuery = query(
        collection(db, 'customerLoyalty'),
        where('customerId', '==', customerId),
        where('carWashId', '==', carWashId)
      );
      
      const snapshot = await getDocs(loyaltyQuery);
      if (snapshot.empty) {
        return null;
      }
      return snapshot.docs[0].data() as CustomerLoyalty;
    } catch (err) {
      setError('Erro ao buscar fidelidade do cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createLoyaltyProgram,
    updateLoyaltyProgram,
    getLoyaltyProgram,
    addCustomerPoints,
    getCustomerLoyalty
  };
}; 