import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAuthContext } from '../providers/AuthProvider';

const { width } = Dimensions.get('window');

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuthContext() ?? {};

  const handleSendCode = async () => {
    try {
      if (resetPassword && email) {
        await resetPassword(email);
        // TODO: Mostrar mensagem de sucesso
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error(error);
      // TODO: Mostrar erro ao enviar código
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
          <Text style={styles.title}>Esqueceu a senha</Text>
          <Text style={styles.subtitle}>Digite seu e-mail abaixo, e enviaremos o código de verificação para resetar sua senha.</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu E-mail..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSendCode}
          >
            <Text style={styles.sendButtonText}>ENVIAR CÓDIGO</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já possui uma conta? </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.loginLink}>Faça o login</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#2f95dc',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#2f95dc',
    fontWeight: 'bold',
  },
}); 