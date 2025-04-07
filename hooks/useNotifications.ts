import { useState, useCallback } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../constants/firebase';
import { Notification } from '../types';
import * as Notifications from 'expo-notifications';

export const useNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendNotification = useCallback(async (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    setLoading(true);
    setError(null);

    try {
      // Salva notificação no Firestore
      const notificationRef = doc(collection(db, 'notifications'));
      await setDoc(notificationRef, {
        ...notification,
        id: notificationRef.id,
        createdAt: new Date(),
        read: false
      });

      // Envia notificação push
      await Notifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.body,
          data: notification.data
        },
        trigger: null // Envia imediatamente
      });

      return notificationRef.id;
    } catch (err) {
      setError('Erro ao enviar notificação');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserNotifications = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const notificationsQuery = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(notificationsQuery);
      return snapshot.docs.map(doc => doc.data() as Notification);
    } catch (err) {
      setError('Erro ao buscar notificações');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    setLoading(true);
    setError(null);

    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { read: true });
    } catch (err) {
      setError('Erro ao marcar notificação como lida');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const setupPushNotifications = useCallback(async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        throw new Error('Permissão para notificações não concedida');
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      return token;
    } catch (err) {
      setError('Erro ao configurar notificações');
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    sendNotification,
    getUserNotifications,
    markAsRead,
    setupPushNotifications
  };
}; 