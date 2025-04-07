import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuthContext } from '../providers/AuthProvider';
import { FontAwesome } from '@expo/vector-icons';
import { Logo } from '@/components/Logo';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { NavLink } from '@/components/NavLink';
import { globalStyles } from '@/app/styles/global';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuthContext();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (auth?.login) {
        await auth.login(email, password);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Logo />

        <View style={styles.formContainer}>
          {auth?.error && <Text style={[styles.errorText, globalStyles.text]}>{auth.error}</Text>}

          <Input
            placeholder="Digite seu E-mail..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="Digite sua senha..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button 
            title="ENTRAR"
            onPress={handleLogin}
            disabled={auth?.loading}
          />

          <TouchableOpacity onPress={() => router.replace('/(auth)/forgot-password')}>
            <Text style={[styles.forgotPassword, globalStyles.textMedium]}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <Text style={[styles.orText, globalStyles.text]}>Ou faça login com</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="apple" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <NavLink 
            text="Não possui uma conta?"
            linkText="Cadastre-se"
            route="/(auth)/register"
          />
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
  formContainer: {
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#2f95dc',
    textAlign: 'right',
    marginTop: 15,
    marginBottom: 20,
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});