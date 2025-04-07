import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { Link } from 'expo-router';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuthContext();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    try {
      await auth?.login(email, password);
    } catch (error) {
      // O erro já é tratado no hook
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
            placeholder="Digite seu E-mail..."
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="***************"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {auth?.error && <Text style={styles.errorText}>{auth.error}</Text>}

          <TouchableOpacity 
            style={[styles.loginButton, auth?.loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={auth?.loading}
          >
            <Text style={styles.loginButtonText}>
              {auth?.loading ? "ENTRANDO..." : "ACESSAR"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/(auth)/forgot-password')}>
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Ou faça login com</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={24} color="#4267B2" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={24} color="#DB4437" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Ainda não possui conta? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </Link>
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
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#2f95dc',
    textAlign: 'right',
    marginTop: 15,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#2f95dc',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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