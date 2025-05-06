import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/app/styles/global';
import { CustomHeader } from '@/components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Href } from 'expo-router';

export default function Profile() {
  const { user } = useAuthContext();
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <CustomHeader title="Meu Perfil" />
        
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user?.name?.charAt(0) || '?'}
                </Text>
              </View>
              <Text style={[styles.userName, globalStyles.textBold]}>
                {user?.name || 'Usuário'}
              </Text>
              <Text style={[styles.userEmail, globalStyles.text]}>
                {user?.email}
              </Text>
            </View>

            <View style={styles.menu}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => router.push('/(customer)/vehicles' as Href)}
              >
                <Ionicons name="car-outline" size={24} color="#666" />
                <Text style={[styles.menuText, globalStyles.text]}>Meus Veículos</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => router.push('/(customer)/orders' as Href)}
              >
                <Ionicons name="list-outline" size={24} color="#666" />
                <Text style={[styles.menuText, globalStyles.text]}>Histórico de Pedidos</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => router.push('/(customer)/carwashes' as Href)}
              >
                <Ionicons name="heart-outline" size={24} color="#666" />
                <Text style={[styles.menuText, globalStyles.text]}>Lava-rápidos Favoritos</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => router.push('/(customer)/settings' as Href)}
              >
                <Ionicons name="settings-outline" size={24} color="#666" />
                <Text style={[styles.menuText, globalStyles.text]}>Configurações</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
  userName: {
    fontSize: 24,
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
}); 