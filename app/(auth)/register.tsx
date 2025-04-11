import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Toast } from '@/components/Toast';
import { PhoneInput } from '@/components/PhoneInput';
import { useAuth } from '@/hooks/useAuth';
import { useValidation } from '@/hooks/useValidation';
import { globalStyles } from '@/app/styles/global';
import { registerSchema, type RegisterFormData } from '@/schemas/register';
import { Checkbox } from '@/components/Checkbox';

const emailRegex = /.+@.+\..+/;
const validateEmail = (email: string) => emailRegex.test(email);

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastType, setToastType] = React.useState<'success' | 'error'>('success');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailValidation = useValidation(validateEmail);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordsMatch = password === confirmPassword && password.length > 0;

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
  };

  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  const onSubmit = async (data: RegisterFormData) => {
    if (!acceptTerms) {
      setTermsError('Você precisa aceitar os termos e condições');
      return;
    }

    try {
      await register({
        email: data.email,
        password: data.password,
        name: data.name,
        userType: 'customer',
      });
      showSuccessToast('Conta criada com sucesso!');
      setTimeout(() => {
        router.replace('/(customer)/home');
      }, 1500);
    } catch (error: any) {
      showErrorToast(error.message || 'Erro ao criar conta');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Logo size="large" />

          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome completo"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                  autoCapitalize="words"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder="E-mail"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    emailValidation.validate(text);
                  }}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  validation={value.length > 2 ? {
                    icon: emailValidation.getStatusIcon(emailValidation.validation.status),
                    message: emailValidation.validation.message,
                    color: emailValidation.getStatusColor(emailValidation.validation.status),
                  } : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  value={value}
                  onChangeText={onChange}
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirmar senha"
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                  validateOnBlur
                  validation={value.length > 0 ? {
                    icon: passwordsMatch ? '✅' : '❌',
                    message: passwordsMatch ? 'Senhas conferem!' : 'Senhas não conferem',
                    color: passwordsMatch ? '#4CAF50' : '#F44336',
                  } : undefined}
                />
              )}
            />

            <View style={styles.termsContainer}>
              <Checkbox
                value={acceptTerms}
                onValueChange={setAcceptTerms}
                error={termsError}
              />
              <Text style={[globalStyles.text, styles.termsText]}>
                Eu concordo com os{' '}
                <Text style={styles.link} onPress={() => router.push('../terms')}>
                  Termos de Uso
                </Text>{' '}
                e{' '}
                <Text style={styles.link} onPress={() => router.push('../privacy')}>
                  Política de Privacidade
                </Text>
              </Text>
            </View>

            <Button
              title="Cadastrar"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
            />

            <View style={styles.loginContainer}>
              <Text style={[globalStyles.text, styles.loginText]}>
                Já tem uma conta?{' '}
              </Text>
              <Text
                style={[globalStyles.text, styles.loginLink]}
                onPress={() => router.push('/(auth)/login')}
              >
                Faça login
              </Text>
            </View>

            <View style={styles.registerOwnerContainer}>
              <Text style={[globalStyles.text, styles.registerOwnerText]}>
                É proprietário?{' '}
              </Text>
              <Text
                style={[globalStyles.text, styles.registerOwnerLink]}
                onPress={() => router.push('/(auth)/register-owner')}
              >
                Cadastre seu lava-rápido
              </Text>
            </View>
          </View>
        </ScrollView>

        {showToast && (
          <View style={styles.toastContainer}>
            <Toast
              message={toastMessage}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          </View>
        )}
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  formContainer: {
    gap: 16,
    marginTop: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#007AFF',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  termsText: {
    flex: 1,
    marginLeft: 8,
  },
  link: {
    color: '#007AFF',
  },
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  registerOwnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  registerOwnerText: {
    color: '#666',
    fontWeight: '700',
  },
  registerOwnerLink: {
    color: '#007AFF',
  },
});