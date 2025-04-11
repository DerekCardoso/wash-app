import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '@/app/styles/global';
import { LocationSelector } from '@/components/LocationSelector';
import { NotificationBell } from '@/components/NotificationBell';
import { ActiveOrderCard } from '@/components/ActiveOrderCard';
import { PromoCard } from '@/components/PromoCard';
import { ServicePill } from '@/components/ServicePill';
import { CarWashCard } from '@/components/CarWashCard';
import { HistoryPreview } from '@/components/HistoryPreview';
import { UserAppBar } from '@/components/UserAppBar';
import type { Href } from 'expo-router';

// Dados mockados para exemplo
const mockPromotions = [
  {
    id: '1',
    image: 'https://example.com/promo1.jpg',
    title: 'Lavagem Expressa 50% OFF',
    subtitle: 'Válido por 24h',
    bannerColor: '#4A90E2',
  },
  {
    id: '2',
    image: 'https://example.com/promo2.jpg',
    title: 'Completa + Cera por R$ 99',
    subtitle: 'Válido por 24h',
    bannerColor: '#4A90E2',
  },
];

const mockServices = [
  { id: '1', icon: '⏱️', label: 'Expressa', active: true },
  { id: '2', icon: '✨', label: 'Completa', active: false },
  { id: '3', icon: '🧼', label: 'Higienização', active: false },
  { id: '4', icon: '🔧', label: 'Motor', active: false },
  { id: '5', icon: '📸', label: 'Polimento', active: false },
];

const mockCarWashes = [
  {
    id: '1',
    name: 'LavaJet Express',
    image: 'https://example.com/carwash1.jpg',
    rating: 4.7,
    distance: '0.5 km',
    isOpen: true,
    isPremium: true,
    services: ['Expressa', 'Completa'],
  },
  {
    id: '2',
    name: 'AutoSpa Premium',
    image: 'https://example.com/carwash2.jpg',
    rating: 4.9,
    distance: '1.2 km',
    isOpen: true,
    isPremium: true,
    services: ['Completa', 'Higienização'],
  },
];

const mockLastOrder = {
  date: 'ONTEM',
  carWashName: 'AutoSpa Premium',
  service: 'Lavagem Premium',
  rating: 5,
};

export default function CustomerHome() {
  const { user = null } = useAuthContext() ?? { user: null };
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeOrder, setActiveOrder] = useState({
    id: 'XYZ123',
    status: 'washing' as const,
    carWashName: 'LavaJet Express',
    estimatedTime: '15:00',
    carPlate: 'ABC1D23',
    progress: 0.54,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // TODO: Implementar atualização de dados
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* App Bar Superior */}
        <View style={styles.appBar}>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-pin" size={20} color="#4A90E2" />
            <Text style={styles.address}>Av. Paulista, 1000 • Alterar</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.userBadge}
            onPress={() => router.push('/profile')}
          >
            <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'Cliente'}</Text>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0) || '?'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Status do Pedido */}
        {activeOrder && (
          <ActiveOrderCard
            carWashName={activeOrder.carWashName}
            estimatedTime={activeOrder.estimatedTime}
            progress={activeOrder.progress}
            onPress={() => router.push('/order-tracking' as Href)}
          />
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Categorias */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesContainer}
          >
            {mockServices.map(service => (
              <ServicePill
                key={service.id}
                {...service}
                onPress={() => {/* TODO: Implementar filtro */}}
              />
            ))}
          </ScrollView>

          {/* Promoções */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promotionsContainer}
          >
            {mockPromotions.map(promo => (
              <PromoCard
                key={promo.id}
                {...promo}
                onPress={() => router.push(`/promo/${promo.id}` as Href)}
              />
            ))}
          </ScrollView>

          {/* Recomendados */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[globalStyles.textBold, styles.sectionTitle]}>
                Recomendados para você
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            
            {mockCarWashes.map(carWash => (
              <CarWashCard
                price={'R$ 100'}
                key={carWash.id}
                {...carWash}
                onPress={() => router.push(`/car-wash/${carWash.id}` as Href)}
              />
            ))}
          </View>

          <HistoryPreview
            lastOrder={mockLastOrder}
            onPress={() => router.push('/order-history' as Href)}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    marginRight: 8,
    fontSize: 14,
    color: '#666',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderCard: {
    backgroundColor: '#4A90E2',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderTitle: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderProgress: {
    marginBottom: 12,
  },
  orderShop: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  orderTime: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  orderCTA: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  servicesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  promotionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
  },
  seeAll: {
    color: '#4A90E2',
    fontSize: 14,
  },
}); 