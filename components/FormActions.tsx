import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../../atoms/Button/Button';
import { theme } from '../../../constants/theme';

interface FormActionsProps {
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
  cancelLabel = 'Cancelar',
  loading = false,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      {onCancel && (
        <Button
          title={cancelLabel}
          onPress={onCancel}
          variant="outline"
          style={styles.cancelButton}
          disabled={disabled}
        />
      )}
      <Button
        title={submitLabel}
        onPress={onSubmit}
        variant="primary"
        loading={loading}
        disabled={disabled}
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  cancelButton: {
    minWidth: 100,
  },
  submitButton: {
    minWidth: 100,
  },
}); 