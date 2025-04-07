import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuthContext } from '../providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomerHome() {
  const { user = null, logout } = useAuthContext() ?? { user: null, logout: undefined };

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerInfo}>
              <Text style={styles.welcomeText}>Bem-vindo, {user?.displayName || 'Cliente'}!</Text>
              <Text style={styles.emailText}>{user?.email}</Text>
            </View>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="exit-outline" size={24} color="#2f95dc" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Link href="/(customer)/carwashes" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="car-outline" size={32} color="#2f95dc" />
              <Text style={styles.menuText}>Lava-Rápidos</Text>
              <Text style={styles.menuDescription}>Encontre lava-rápidos próximos</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(customer)/orders" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="list-outline" size={32} color="#2f95dc" />
              <Text style={styles.menuText}>Meus Pedidos</Text>
              <Text style={styles.menuDescription}>Acompanhe seus pedidos</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(customer)/home" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={32} color="#2f95dc" />
              <Text style={styles.menuText}>Meu Perfil</Text>
              <Text style={styles.menuDescription}>Gerencie suas informações</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerInfo: {
    flex: 1,
  },
  logoutButton: {
    padding: 5,
    marginLeft: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
    flex: 1,
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 15,
  },
}); 