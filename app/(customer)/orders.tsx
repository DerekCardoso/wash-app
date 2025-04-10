import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useOrders } from '@/hooks/useOrders';
import { globalStyles } from '@/app/styles/global';

export default function OrdersScreen() {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.loadingText, globalStyles.text]}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles.textBold]}>Meus Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={[styles.orderId, globalStyles.textBold]}>Pedido #{item.id.slice(0, 6)}</Text>
            <Text style={[styles.orderStatus, globalStyles.text]}>Status: {item.status}</Text>
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
  orderItem: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  orderId: {
    fontSize: 18,
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 16,
    color: '#666',
  },
}); 