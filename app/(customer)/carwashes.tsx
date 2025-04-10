import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCarWash } from '@/hooks/useCarWash';
import { globalStyles } from '@/app/styles/global';
import { useState, useEffect } from 'react';
import { CarWash } from '@/types';

export default function CarWashesScreen() {
  const { loading, getNearbyCarWashes } = useCarWash();
  const [carWashes, setCarWashes] = useState<CarWash[]>([]);

  useEffect(() => {
    const fetchCarWashes = async () => {
      try {
        // TODO: Obter localização do usuário
        const nearbyCarWashes = await getNearbyCarWashes(0, 0);
        setCarWashes(nearbyCarWashes);
      } catch (error) {
        console.error('Erro ao buscar lava-rápidos:', error);
      }
    };

    fetchCarWashes();
  }, [getNearbyCarWashes]);

  const formatAddress = (address: CarWash['address']) => {
    return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city}/${address.state}`;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.loadingText, globalStyles.text]}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles.textBold]}>Lava-Rápidos Disponíveis</Text>
      <FlatList
        data={carWashes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.carWashItem}>
            <Text style={[styles.carWashName, globalStyles.textBold]}>{item.name}</Text>
            <Text style={[styles.carWashAddress, globalStyles.text]}>{formatAddress(item.address)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  carWashItem: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  carWashName: {
    fontSize: 18,
    marginBottom: 5,
  },
  carWashAddress: {
    fontSize: 16,
    color: '#666',
  },
}); 