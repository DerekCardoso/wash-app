import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAuthContext } from '../providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function RegisterOwner() {
  const [establishmentName, setEstablishmentName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuthContext() ?? {};

  const handleRegister = async () => {
    try {
      if (register) {
        await register({
          email,
          password,
          name: `${ownerName} (${establishmentName})`,
          userType: 'owner'
        });
        router.replace('/(owner)' as any);
      }
    } catch (error) {
      console.error(error);
      // TODO: Mostrar erro de registro
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo azul.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome do estabelecimento..."
            value={establishmentName}
            onChangeText={setEstablishmentName}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Nome do proprietário..."
            value={ownerName}
            onChangeText={setOwnerName}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleRegister}
          >
            <Text style={styles.loginButtonText}>CADASTRAR</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Cadastre-se como </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/register' as any)}>
              <Text style={styles.registerLink}>cliente</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Já possui uma conta? </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login' as any)}>
              <Text style={styles.registerLink}>Faça o login</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#2f95dc',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
  },
  registerLink: {
    color: '#2f95dc',
    fontWeight: 'bold',
  },
}); 