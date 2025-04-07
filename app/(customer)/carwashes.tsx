import { View, Text, FlatList } from 'react-native';
import { useCarWash } from '@/hooks/useCarWash';

export default function CarWashesScreen() {
  const { carWashes, loading } = useCarWash();

  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Lava-Rápidos Disponíveis</Text>
      <FlatList
        data={carWashes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
} 