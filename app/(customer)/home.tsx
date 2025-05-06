import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Image, ActivityIndicator } from 'react-native';
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
import { AddressEditor } from '@/components/AddressEditor';
import { useLocation } from '@/hooks/useLocation';
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
  {
    id: '3',
    name: 'LavaRápido do João',
    image: 'https://example.com/carwash3.jpg',
    rating: 4.5,
    distance: '0.8 km',
    isOpen: true,
    isPremium: false,
    services: ['Expressa', 'Completa'],
  },
  {
    id: '4',
    name: 'LavaCar Express',
    image: 'https://example.com/carwash4.jpg',
    rating: 4.3,
    distance: '1.5 km',
    isOpen: true,
    isPremium: false,
    services: ['Expressa', 'Higienização'],
  },
  {
    id: '5',
    name: 'LavaRápido do Zé',
    image: 'https://example.com/carwash5.jpg',
    rating: 4.8,
    distance: '0.7 km',
    isOpen: true,
    isPremium: true,
    services: ['Expressa', 'Completa', 'Higienização'],
  },
  {
    id: '6',
    name: 'AutoLava Premium',
    image: 'https://example.com/carwash6.jpg',
    rating: 4.6,
    distance: '1.0 km',
    isOpen: true,
    isPremium: true,
    services: ['Completa', 'Higienização', 'Polimento'],
  },
  {
    id: '7',
    name: 'LavaCar do Bairro',
    image: 'https://example.com/carwash7.jpg',
    rating: 4.4,
    distance: '0.9 km',
    isOpen: true,
    isPremium: false,
    services: ['Expressa', 'Completa'],
  },
  {
    id: '8',
    name: 'LavaJet do Centro',
    image: 'https://example.com/carwash8.jpg',
    rating: 4.2,
    distance: '1.3 km',
    isOpen: true,
    isPremium: false,
    services: ['Expressa', 'Higienização'],
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
  const [isAddressEditorVisible, setIsAddressEditorVisible] = useState(false);
  const { address, loading: locationLoading, error: locationError } = useLocation();
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

  const handleSaveAddress = (address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  }) => {
    // TODO: Implementar salvamento do endereço
    console.log('Novo endereço:', address);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* App Bar Superior */}
        <View style={styles.appBar}>
          <TouchableOpacity 
            style={styles.locationContainer}
            onPress={() => setIsAddressEditorVisible(true)}
          >
            <MaterialIcons name="location-pin" size={20} color="#4A90E2" />
            {locationLoading ? (
              <ActivityIndicator size="small" color="#4A90E2" />
            ) : locationError ? (
              <Text style={styles.address}>Erro ao obter localização</Text>
            ) : (
              <Text style={styles.address}>{address} • Alterar</Text>
            )}
          </TouchableOpacity>
          
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
            
            <View style={styles.gridWrapper}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.gridContainer}
              >
                {Array.from({ length: Math.ceil(mockCarWashes.length / 4) }).map((_, groupIndex) => (
                  <View key={groupIndex} style={styles.gridGroup}>
                    {mockCarWashes.slice(groupIndex * 4, groupIndex * 4 + 4).map((carWash, index) => (
                      <View key={carWash.id} style={[
                        styles.gridItem,
                        index % 2 === 0 ? styles.leftItem : styles.rightItem
                      ]}>
                        <CarWashCard
                          price={'R$ 100'}
                          {...carWash}
                          onPress={() => router.push(`/car-wash/${carWash.id}` as Href)}
                        />
                      </View>
                    ))}
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.historyPreviewContainer}>
            <HistoryPreview
              lastOrder={mockLastOrder}
              onPress={() => router.push('/order-history' as Href)}
            />
          </View>
        </ScrollView>

        <AddressEditor
          visible={isAddressEditorVisible}
          onClose={() => setIsAddressEditorVisible(false)}
          onSave={handleSaveAddress}
        />
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
  gridWrapper: {
    height: 400, // Altura para 2 linhas
  },
  gridContainer: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  gridGroup: {
    width: 215, // Largura para 2 itens
    marginRight: 8,
  },
  gridItem: {
    width: 180,
    marginBottom: 12,
  },
  leftItem: {
    marginRight: 8,
  },
  rightItem: {
    marginRight: 0,
  },
  historyPreviewContainer: {
    marginTop: 24,
  },
}); 