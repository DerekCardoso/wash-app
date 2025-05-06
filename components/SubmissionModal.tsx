import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '@/app/styles/global';

type SubmissionModalProps = {
  visible: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  onRetry?: () => void;
};

export function SubmissionModal({ 
  visible, 
  type, 
  message, 
  onClose,
  onRetry 
}: SubmissionModalProps) {
  const isSuccess = type === 'success';

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      accessibilityViewIsModal={true}
      onRequestClose={onClose}
    >
      <View 
        style={styles.modalOverlay}
        accessibilityRole="alert"
      >
        <View style={[
          styles.modalContainer,
          isSuccess ? styles.successBorder : styles.errorBorder
        ]}>
          <Text 
            style={[styles.modalTitle, globalStyles.textBold]}
            accessibilityRole="header"
          >
            {isSuccess ? '✅ Sucesso!' : '❌ Erro'}
          </Text>
          
          <Text 
            style={[styles.modalText, globalStyles.text]}
            accessibilityLiveRegion="polite"
          >
            {message}
          </Text>

          <View style={styles.buttonContainer}>
            {!isSuccess && onRetry && (
              <TouchableOpacity 
                style={[styles.button, styles.retryButton]}
                onPress={onRetry}
                accessibilityLabel="Tentar novamente"
                accessibilityRole="button"
              >
                <Text style={[styles.buttonText, globalStyles.textBold]}>
                  Tentar Novamente
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                isSuccess ? styles.successButton : styles.errorButton
              ]}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={isSuccess ? "Fechar" : "Tentar novamente"}
            >
              <Text style={styles.buttonText}>
                {isSuccess ? "Fechar" : "Tentar novamente"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '85%',
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  successBorder: { 
    borderTopWidth: 5, 
    borderTopColor: '#4CAF50' 
  },
  errorBorder: { 
    borderTopWidth: 5, 
    borderTopColor: '#F44336' 
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: '#4CAF50',
  },
  errorButton: {
    backgroundColor: '#F44336',
  },
  retryButton: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
}); 