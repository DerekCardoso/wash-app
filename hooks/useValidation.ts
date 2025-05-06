import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

type ValidationStatus = 'idle' | 'typing' | 'valid' | 'invalid';

interface ValidationState {
  status: ValidationStatus;
  message: string;
}

export const useValidation = (validateFn: (value: string) => boolean, delay = 300) => {
  const [validation, setValidation] = useState<ValidationState>({
    status: 'idle',
    message: '',
  });

  const debouncedValidate = useCallback(
    debounce((value: string) => {
      if (value.length < 3) {
        setValidation({ status: 'typing', message: 'Continue digitando...' });
        return;
      }

      const isValid = validateFn(value);
      setValidation({
        status: isValid ? 'valid' : 'invalid',
        message: isValid ? 'Válido!' : 'Formato inválido',
      });
    }, delay),
    [validateFn]
  );

  const getStatusColor = (status: ValidationStatus) => {
    switch (status) {
      case 'valid':
        return '#4CAF50';
      case 'invalid':
        return '#F44336';
      case 'typing':
        return '#2196F3';
      default:
        return '#999';
    }
  };

  const getStatusIcon = (status: ValidationStatus) => {
    switch (status) {
      case 'valid':
        return '✅';
      case 'invalid':
        return '❌';
      case 'typing':
        return '⏳';
      default:
        return '';
    }
  };

  return {
    validation,
    validate: debouncedValidate,
    getStatusColor,
    getStatusIcon,
  };
}; 