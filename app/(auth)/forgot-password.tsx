import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuthContext } from '../providers/AuthProvider';
import { Logo } from '@/components/Logo';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { NavLink } from '@/components/NavLink';
import { globalStyles } from '@/app/styles/global';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const auth = useAuthContext();
  const router = useRouter();

  const handleResetPassword = async () => {
    try {
      if (auth?.resetPassword) {
        await auth.resetPassword(email);
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
          <Text style={[styles.title, globalStyles.textBold]}>Esqueceu sua senha?</Text>
          <Text style={[styles.description, globalStyles.text]}>
            Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha.
          </Text>

          {auth?.error && <Text style={[styles.errorText, globalStyles.text]}>{auth.error}</Text>}
          {auth?.success && <Text style={[styles.successText, globalStyles.text]}>{auth.success}</Text>}

          <Input
            placeholder="Digite seu E-mail..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button 
            title="ENVIAR CÓDIGO"
            onPress={handleResetPassword}
            disabled={auth?.loading}
          />

          <NavLink 
            text="Lembrou sua senha?"
            linkText="Voltar para o login"
            route="/(auth)/login"
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
  title: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  errorText: {
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 15,
  },
  successText: {
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 15,
  },
}); 