import { View, Text, FlatList } from 'react-native';
import { useOrders } from '@/hooks/useOrders';

export default function OrdersScreen() {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Meus Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Pedido #{item.id.slice(0, 6)}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
} 