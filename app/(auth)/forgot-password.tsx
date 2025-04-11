import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Toast } from '@/components/Toast';
import { SubmissionModal } from '@/components/SubmissionModal';
import { useValidation } from '@/hooks/useValidation';
import { globalStyles } from '@/app/styles/global';
import { Ionicons } from '@expo/vector-icons';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateEmail = (email: string) => emailRegex.test(email);

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const emailValidation = useValidation(validateEmail);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = useCallback(async () => {
    if (emailValidation.validation.status !== 'valid') {
      return;
    }

    setLoading(true);
    try {
      // TODO: Implementar envio de e-mail de redefinição
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulação
      setShowModal(true);
    } catch (error: any) {
      let message = 'Erro ao enviar e-mail';
      
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'E-mail não cadastrado';
          break;
        case 'auth/too-many-requests':
          message = 'Muitas tentativas. Tente mais tarde';
          break;
      }

      setToastMessage(message);
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  }, [email, emailValidation.validation.status]);

  const handleModalClose = () => {
    setShowModal(false);
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Logo size="large" />

        <View style={styles.content}>
          <Text style={[globalStyles.textBold, styles.title]}>Redefinir senha</Text>
          <Text style={[globalStyles.text, styles.subtitle]}>
            Digite seu e-mail para receber o link de recuperação
          </Text>

          <Input
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              emailValidation.validate(text);
            }}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            prefix="📧"
            error={emailValidation.validation.message}
            validation={email.length > 0 ? {
              icon: emailValidation.getStatusIcon(emailValidation.validation.status),
              message: emailValidation.validation.message,
              color: emailValidation.getStatusColor(emailValidation.validation.status),
            } : undefined}
          />

          <Button
            title={loading ? "Enviando..." : "Enviar link"}
            onPress={handleSubmit}
            loading={loading}
            disabled={emailValidation.validation.status !== 'valid' || loading}
          />

          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
            accessibilityLabel="Voltar para o login"
            accessibilityRole="button"
          >
            <Ionicons name="arrow-back" size={20} color="#007AFF" />
            <Text style={[globalStyles.text, styles.backButtonText]}>
              Voltar para o login
            </Text>
          </TouchableOpacity>
        </View>

        <SubmissionModal
          visible={showModal}
          type="success"
          message="E-mail enviado! Verifique sua caixa de entrada e spam"
          onClose={handleModalClose}
        />

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
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 8,
  },
  backButtonText: {
    color: '#007AFF',
    marginLeft: 8,
    fontSize: 16,
  },
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
}); 