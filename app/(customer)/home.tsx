import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '@/app/styles/global';

export default function CustomerHome() {
  const { user = null, logout } = useAuthContext() ?? { user: null, logout: undefined };
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerInfo}>
              <Text style={[styles.welcomeText, globalStyles.textBold]}>Bem-vindo(a), {user?.name || 'Cliente'}!</Text>
              <Text style={[styles.emailText, globalStyles.text]}>{user?.email}</Text>
            </View>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="exit-outline" size={24} color="#2f95dc" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <Text style={[styles.title, globalStyles.textBold]}>Meus Agendamentos</Text>
          {/* TODO: Adicionar lista de agendamentos */}
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
  header: {
    backgroundColor: '#2f95dc',
    padding: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    marginLeft: 15,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
}); 