import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../providers/AuthProvider';
import { FontAwesome } from '@expo/vector-icons';
import { Logo } from '@/components/Logo';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { NavLink } from '@/components/NavLink';
import { globalStyles } from '@/app/styles/global';
import { useAuth } from '@/hooks/useAuth';
import { Toast } from '@/components/Toast';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('error');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/(customer)/home');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        showErrorToast('Email ou senha inválidos');
        setErrors({
          ...errors,
          email: 'Email ou senha inválidos',
          password: 'Email ou senha inválidos',
        });
      } else {
        showErrorToast('Erro ao fazer login');
        setErrors({
          ...errors,
          email: 'Erro ao fazer login',
          password: 'Erro ao fazer login',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      email.length > 0 &&
      password.length > 0 &&
      validateEmail(email) &&
      !errors.email &&
      !errors.password
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Logo size="large" />

        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}

        <View style={styles.formContainer}>
          {useAuthContext()?.error && <Text style={[styles.errorText, globalStyles.text]}>{useAuthContext().error}</Text>}

          <Input
            placeholder="Digite seu E-mail..."
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: '' });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            onBlur={() => {
              if (email && !validateEmail(email)) {
                setErrors({ ...errors, email: 'Email inválido' });
              }
            }}
          />

          <Input
            placeholder="Digite sua senha..."
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: '' });
            }}
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push('/(auth)/forgot-password')}
          >
            <Text style={[styles.forgotPasswordText, globalStyles.textMedium]}>
              Esqueceu sua senha?
            </Text>
          </TouchableOpacity>

          <Button
            title={loading ? <ActivityIndicator color="#fff" /> : "Entrar"}
            onPress={handleLogin}
            disabled={!isFormValid() || loading}
          />

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
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#007AFF',
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 4,
  },
  registerText: {
    color: '#666',
  },
  registerLink: {
    color: '#007AFF',
  },
});