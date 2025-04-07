import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { Link } from 'expo-router';
import { globalStyles } from '@/constants/styles';
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
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Cadastro de Proprietário</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      
      <TextInput
        style={globalStyles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={globalStyles.input}
        placeholder="Nome da Lavagem"
        value={companyName}
        onChangeText={setCompanyName}
        autoCapitalize="words"
      />
      
      <TextInput
        style={globalStyles.input}
        placeholder="Senha"
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