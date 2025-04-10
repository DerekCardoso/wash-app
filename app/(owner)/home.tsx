import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/app/styles/global';

export default function OwnerDashboard() {
  const { user, logout } = useAuthContext() ?? {};
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

  // Dados temporários para simular os agendamentos
  const appointments = [
    {
      id: 1,
      customerName: 'João Silva',
      service: 'Lavagem Completa',
      date: '2024-03-20',
      time: '14:00',
      status: 'pending'
    },
    {
      id: 2,
      customerName: 'Maria Santos',
      service: 'Lavagem Simples',
      date: '2024-03-20',
      time: '15:30',
      status: 'confirmed'
    },
    {
      id: 3,
      customerName: 'Pedro Oliveira',
      service: 'Lavagem Premium',
      date: '2024-03-21',
      time: '09:00',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      default:
        return '#999';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerInfo}>
              <Text style={[styles.welcomeText, globalStyles.textBold]}>Bem-vindo(a), {user?.name || 'Dono'}!</Text>
              <Text style={[styles.emailText, globalStyles.text]}>{user?.email}</Text>
            </View>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={[styles.logoutText, globalStyles.textBold]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, globalStyles.textBold]}>Agendamentos do Dia</Text>
            {appointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <Text style={[styles.customerName, globalStyles.textBold]}>{appointment.customerName}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
                    <Text style={[styles.statusText, globalStyles.text]}>{getStatusText(appointment.status)}</Text>
                  </View>
                </View>
                <View style={styles.appointmentDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="car-outline" size={16} color="#666" />
                    <Text style={[styles.detailText, globalStyles.text]}>{appointment.service}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text style={[styles.detailText, globalStyles.text]}>{appointment.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={[styles.detailText, globalStyles.text]}>{appointment.time}</Text>
                  </View>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={[styles.actionButton, styles.confirmButton]}>
                    <Text style={[styles.actionButtonText, globalStyles.textBold]}>Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
                    <Text style={[styles.actionButtonText, styles.cancelButtonText, globalStyles.textBold]}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
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
  welcomeText: {
    fontSize: 24,
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    padding: 5,
    marginLeft: 15,
  },
  logoutText: {
    color: '#2f95dc',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerName: {
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
  },
  appointmentDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  cancelButtonText: {
    color: '#666',
  },
}); 