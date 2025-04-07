import { useState, useCallback } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../constants/firebase';
import { PerformanceReport } from '../types';

export const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePerformanceReport = useCallback(async (carWashId: string, startDate: Date, endDate: Date) => {
    setLoading(true);
    setError(null);

    try {
      // Busca pedidos no período
      const ordersQuery = query(
        collection(db, 'orders'),
        where('carWashId', '==', carWashId),
        where('createdAt', '>=', startDate),
        where('createdAt', '<=', endDate)
      );
      
      const ordersSnapshot = await getDocs(ordersQuery);
      const orders = ordersSnapshot.docs.map(doc => doc.data());

      // Calcula métricas
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      const totalOrders = orders.length;
      
      // Calcula média de avaliações
      const ratings = orders.filter(order => order.rating).map(order => order.rating);
      const averageRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0;

      // Calcula serviços mais populares
      const serviceCounts: { [key: string]: { count: number; revenue: number } } = {};
      orders.forEach(order => {
        order.services.forEach(serviceId => {
          if (!serviceCounts[serviceId]) {
            serviceCounts[serviceId] = { count: 0, revenue: 0 };
          }
          serviceCounts[serviceId].count++;
          serviceCounts[serviceId].revenue += order.totalPrice / order.services.length;
        });
      });

      const popularServices = Object.entries(serviceCounts)
        .map(([serviceId, data]) => ({
          serviceId,
          count: data.count,
          revenue: data.revenue
        }))
        .sort((a, b) => b.count - a.count);

      // Calcula horários de pico
      const hourCounts: { [key: number]: number } = {};
      orders.forEach(order => {
        const hour = new Date(order.createdAt).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      });

      const peakHours = Object.entries(hourCounts)
        .map(([hour, orders]) => ({
          hour: parseInt(hour),
          orders
        }))
        .sort((a, b) => b.orders - a.orders);

      // Calcula crescimento de clientes
      const uniqueCustomers = new Set(orders.map(order => order.customerId)).size;
      const previousPeriodQuery = query(
        collection(db, 'orders'),
        where('carWashId', '==', carWashId),
        where('createdAt', '>=', new Date(startDate.getTime() - (endDate.getTime() - startDate.getTime()))),
        where('createdAt', '<', startDate)
      );
      
      const previousSnapshot = await getDocs(previousPeriodQuery);
      const previousUniqueCustomers = new Set(previousSnapshot.docs.map(doc => doc.data().customerId)).size;
      
      const customerGrowth = previousUniqueCustomers > 0
        ? ((uniqueCustomers - previousUniqueCustomers) / previousUniqueCustomers) * 100
        : 0;

      // Cria relatório
      const report: Omit<PerformanceReport, 'id'> = {
        carWashId,
        period: { start: startDate, end: endDate },
        totalRevenue,
        totalOrders,
        averageRating,
        popularServices,
        customerGrowth,
        peakHours
      };

      // Salva relatório
      const reportRef = doc(collection(db, 'performanceReports'));
      await setDoc(reportRef, {
        ...report,
        id: reportRef.id
      });

      return reportRef.id;
    } catch (err) {
      setError('Erro ao gerar relatório');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPerformanceReports = useCallback(async (carWashId: string) => {
    setLoading(true);
    setError(null);

    try {
      const reportsQuery = query(
        collection(db, 'performanceReports'),
        where('carWashId', '==', carWashId),
        orderBy('period.end', 'desc')
      );
      
      const snapshot = await getDocs(reportsQuery);
      return snapshot.docs.map(doc => doc.data() as PerformanceReport);
    } catch (err) {
      setError('Erro ao buscar relatórios');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    generatePerformanceReport,
    getPerformanceReports
  };
}; 