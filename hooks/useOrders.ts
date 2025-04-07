import { useState, useCallback } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../constants/firebase';
import { Order, OrderStatus, PaymentStatus } from '../types';

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(async (order: Omit<Order, 'id' | 'createdAt'>) => {
    setLoading(true);
    setError(null);

    try {
      const orderRef = doc(collection(db, 'orders'));
      await setDoc(orderRef, {
        ...order,
        id: orderRef.id,
        createdAt: new Date(),
        status: 'pending' as OrderStatus,
        paymentStatus: 'pending' as PaymentStatus
      });

      return orderRef.id;
    } catch (err) {
      setError('Erro ao criar pedido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus) => {
    setLoading(true);
    setError(null);

    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status });
    } catch (err) {
      setError('Erro ao atualizar status do pedido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePaymentStatus = useCallback(async (orderId: string, paymentStatus: PaymentStatus) => {
    setLoading(true);
    setError(null);

    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { paymentStatus });
    } catch (err) {
      setError('Erro ao atualizar status do pagamento');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrder = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);

    try {
      const orderDoc = await getDoc(doc(db, 'orders', orderId));
      if (!orderDoc.exists()) {
        throw new Error('Pedido não encontrado');
      }
      return orderDoc.data() as Order;
    } catch (err) {
      setError('Erro ao buscar pedido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCustomerOrders = useCallback(async (customerId: string) => {
    setLoading(true);
    setError(null);

    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(ordersQuery);
      return snapshot.docs.map(doc => doc.data() as Order);
    } catch (err) {
      setError('Erro ao buscar pedidos do cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCarWashOrders = useCallback(async (carWashId: string) => {
    setLoading(true);
    setError(null);

    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        where('carWashId', '==', carWashId),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(ordersQuery);
      return snapshot.docs.map(doc => doc.data() as Order);
    } catch (err) {
      setError('Erro ao buscar pedidos do lava-rápido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    getOrder,
    getCustomerOrders,
    getCarWashOrders
  };
};