import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Toast';
import { Stepper } from '@/components/Stepper';
import { ImagePickerComponent } from '@/components/ImagePicker';
import { globalStyles } from '@/app/styles/global';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from '@/components/Logo';

const steps = [
  'Dados Pessoais',
  'Dados do Lava-Rápido',
  'Localização',
];

export default function RegisterOwner() {
  const router = useRouter();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('error');

  // Dados pessoais
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Dados do lava-rápido
  const [carWashName, setCarWashName] = useState('');
  const [carWashDescription, setCarWashDescription] = useState('');
  const [logo, setLogo] = useState('');

  // Localização
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        if (!name || !email || !phone || !password || !confirmPassword) {
          showErrorToast('Preencha todos os campos');
          return false;
        }
        if (password !== confirmPassword) {
          showErrorToast('As senhas não coincidem');
          return false;
        }
        if (password.length < 6) {
          showErrorToast('A senha deve ter no mínimo 6 caracteres');
          return false;
        }
        return true;
      case 1:
        if (!carWashName || !carWashDescription || !logo) {
          showErrorToast('Preencha todos os campos');
          return false;
        }
        return true;
      case 2:
        if (!address || !city || !state || !zipCode) {
          showErrorToast('Preencha todos os campos');
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleRegister();
      }
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await register({
        email,
        password,
        name,
        userType: 'owner',
        companyName: carWashName,
      });
      router.replace('/(owner)/home' as any);
    } catch (error) {
      showErrorToast('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Input
              placeholder="Nome completo"
              value={name}
              onChangeText={setName}
            />
            <Input
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              placeholder="Telefone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Input
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Input
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </>
        );
      case 1:
        return (
          <>
            <Input
              placeholder="Nome do lava-rápido"
              value={carWashName}
              onChangeText={setCarWashName}
            />
            <Input
              placeholder="Descrição"
              value={carWashDescription}
              onChangeText={setCarWashDescription}
            />
            <ImagePickerComponent
              onImageSelected={setLogo}
            />
          </>
        );
      case 2:
        return (
          <>
            <Input
              placeholder="Endereço"
              value={address}
              onChangeText={setAddress}
            />
            <Input
              placeholder="Cidade"
              value={city}
              onChangeText={setCity}
            />
            <Input
              placeholder="Estado"
              value={state}
              onChangeText={setState}
            />
            <Input
              placeholder="CEP"
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="numeric"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.replace('/(auth)/login')}
            >
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Logo size="small" style={styles.logo} />
            </View>
          </View>
          <Stepper steps={steps} currentStep={currentStep} />
          {renderStep()}
          <Button
            title={currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            onPress={handleNextStep}
          />
        </ScrollView>
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
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
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  logoContainer: {
    padding: 8,
  },
  logo: {
    marginTop: 0,
    marginBottom: 0,
  },
}); 