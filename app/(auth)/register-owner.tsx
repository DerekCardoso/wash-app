import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAuthContext } from '../providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/app/styles/global';

const { width } = Dimensions.get('window');

export default function RegisterOwner() {
  const [establishmentName, setEstablishmentName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { register, loading } = useAuthContext() ?? {};

  const validateForm = () => {
    if (!establishmentName.trim()) {
      setError('Por favor, informe o nome do estabelecimento');
      return false;
    }
    if (!ownerName.trim()) {
      setError('Por favor, informe o nome do proprietário');
      return false;
    }
    if (!email.trim()) {
      setError('Por favor, informe seu e-mail');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, informe um e-mail válido');
      return false;
    }
    if (!password) {
      setError('Por favor, informe sua senha');
      return false;
    }
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return false;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      setError(null);
      
      if (!validateForm()) {
        return;
      }

      if (register) {
        await register({
          email,
          password,
          name: ownerName,
          userType: 'owner',
          companyName: establishmentName
        });
        router.replace('/(owner)' as any);
      }
    } catch (error: any) {
      console.error('Erro no registro:', error);
      setError(error.message || 'Erro ao realizar cadastro');
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
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#dc3545" style={styles.errorIcon} />
              <Text style={[styles.errorText, globalStyles.text]}>{error}</Text>
            </View>
          )}

          <TextInput
            style={[styles.input, globalStyles.text]}
            placeholder="Nome do estabelecimento..."
            value={establishmentName}
            onChangeText={setEstablishmentName}
            placeholderTextColor="#999"
            autoCapitalize="words"
          />

          <TextInput
            style={[styles.input, globalStyles.text]}
            placeholder="Nome do proprietário..."
            value={ownerName}
            onChangeText={setOwnerName}
            placeholderTextColor="#999"
            autoCapitalize="words"
          />

          <TextInput
            style={[styles.input, globalStyles.text]}
            placeholder="E-mail..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <TextInput
            style={[styles.input, globalStyles.text]}
            placeholder="Digite sua senha..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <Text style={[styles.passwordHint, globalStyles.text]}>A senha deve ter pelo menos 8 caracteres</Text>

          <TextInput
            style={[styles.input, globalStyles.text]}
            placeholder="Confirme sua senha..."
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.loginButtonText, globalStyles.textBold]}>CADASTRAR</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, globalStyles.text]}>Cadastre-se como </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/register' as any)}>
              <Text style={[styles.registerLink, globalStyles.textBold]}>cliente</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, globalStyles.text]}>Já possui uma conta? </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login' as any)}>
              <Text style={[styles.registerLink, globalStyles.textBold]}>Faça o login</Text>
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  errorIcon: {
    marginRight: 10,
  },
  errorText: {
    color: '#dc3545',
    flex: 1,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordHint: {
    color: '#666',
    fontSize: 14,
    marginTop: -10,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  loginButton: {
    backgroundColor: '#2f95dc',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  registerText: {
    color: '#666',
    fontSize: 16,
  },
  registerLink: {
    color: '#2f95dc',
    fontSize: 16,
  },
}); 