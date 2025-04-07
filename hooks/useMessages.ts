import { useState, useCallback } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../constants/firebase';
import { Message } from '../types';

export const useMessages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: Omit<Message, 'id' | 'createdAt' | 'read'>) => {
    setLoading(true);
    setError(null);

    try {
      const messageRef = doc(collection(db, 'messages'));
      await setDoc(messageRef, {
        ...message,
        id: messageRef.id,
        createdAt: new Date(),
        read: false
      });

      return messageRef.id;
    } catch (err) {
      setError('Erro ao enviar mensagem');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrderMessages = useCallback((orderId: string, callback: (messages: Message[]) => void) => {
    const messagesQuery = query(
      collection(db, 'messages'),
      where('orderId', '==', orderId),
      orderBy('createdAt', 'asc')
    );

    return onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map(doc => doc.data() as Message);
      callback(messages);
    });
  }, []);

  const markAsRead = useCallback(async (messageId: string) => {
    setLoading(true);
    setError(null);

    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, { read: true });
    } catch (err) {
      setError('Erro ao marcar mensagem como lida');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    sendMessage,
    getOrderMessages,
    markAsRead
  };
}; 