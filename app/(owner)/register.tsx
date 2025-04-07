import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { Link } from 'expo-router';
import { globalStyles } from '@/app/styles/global';
import { useState } from 'react';

export default function OwnerRegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const { register, loading, error } = useAuthContext();

  const handleRegister = async () => {
    if (!name || !email || !password || !companyName) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        userType: 'owner',
        companyName
      });
      // O redirecionamento será feito automaticamente pelo AuthProvider
    } catch (error) {
      // O erro já é tratado no hook
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles.textBold]}>Cadastro de Proprietário</Text>
      {error && <Text style={[styles.errorText, globalStyles.text]}>{error}</Text>}
      
      <TextInput
        style={[styles.input, globalStyles.text]}
        placeholder="Nome"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      
      <TextInput
        style={[styles.input, globalStyles.text]}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={[styles.input, globalStyles.text]}
        placeholder="Nome da Lavagem"
        placeholderTextColor="#666"
        value={companyName}
        onChangeText={setCompanyName}
        autoCapitalize="words"
      />
      
      <TextInput
        style={[styles.input, globalStyles.text]}
        placeholder="Senha"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button
        title={loading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleRegister}
        disabled={loading}
      />
      
      <Link href="/(auth)/login" asChild>
        <Button title="Já tem conta? Faça login" />
      </Link>

      <Link href="/(auth)/register" asChild>
        <Button title="É cliente? Cadastre-se" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
});