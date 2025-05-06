import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '@/app/styles/global';
import { useAddress } from '@/hooks/useAddress';
import { MaskedInput } from './MaskedInput';
import { Address } from '@/types/address';

interface AddressEditorProps {
  visible: boolean;
  onClose: () => void;
  onSave: (address: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function AddressEditor({ visible, onClose, onSave }: AddressEditorProps) {
  const { addresses, loading, getCurrentLocation, searchByZipCode, validateAddress } = useAddress();
  
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingZipCode, setIsLoadingZipCode] = useState(false);

  useEffect(() => {
    if (visible) {
      handleGetLocation();
    }
  }, [visible]);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
      setStreet(defaultAddress.street);
      setNumber(defaultAddress.number);
      setComplement(defaultAddress.complement || '');
      setNeighborhood(defaultAddress.neighborhood);
      setCity(defaultAddress.city);
      setState(defaultAddress.state);
      setZipCode(defaultAddress.zipCode || '');
    }
  }, [addresses]);

  const handleGetLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const location = await getCurrentLocation();
      if (location) {
        setStreet(location.street);
        setNeighborhood(location.neighborhood);
        setCity(location.city);
        setState(location.state);
        setErrors({});
      } else {
        setErrors({
          location: 'Não foi possível obter sua localização. Por favor, preencha manualmente.'
        });
      }
    } catch (error) {
      setErrors({
        location: 'Erro ao obter localização. Por favor, preencha manualmente.'
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleZipCodeSearch = async (value: string) => {
    setZipCode(value);
    const formattedCep = value.replace(/\D/g, '');
    if (formattedCep.length === 8) {
      setIsLoadingZipCode(true);
      try {
        const result = await searchByZipCode(formattedCep);
        if (result) {
          setStreet(result.street);
          setNeighborhood(result.neighborhood);
          setCity(result.city);
          setState(result.state);
          setErrors({});
        } else {
          setErrors({
            zipCode: 'CEP não encontrado'
          });
        }
      } catch (err) {
        setErrors({
          zipCode: 'Erro ao buscar CEP'
        });
      } finally {
        setIsLoadingZipCode(false);
      }
    }
  };

  const handleSave = () => {
    const address: Omit<Address, 'id' | 'createdAt' | 'updatedAt'> = {
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
    };

    const validation = validateAddress(address as Address);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave(address);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalContainer} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={e => e.stopPropagation()}
            style={styles.modalContent}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Editar Endereço</Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.form}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {errors.location && (
                <Text style={styles.errorText}>{errors.location}</Text>
              )}

              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 12 }]}>
                  <Text style={styles.label}>CEP</Text>
                  <MaskedInput
                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                    value={zipCode}
                    onChangeText={handleZipCodeSearch}
                    placeholder="00000-000"
                    keyboardType="numeric"
                    error={errors.zipCode}
                  />
                  {isLoadingZipCode && (
                    <ActivityIndicator size="small" color="#4A90E2" style={styles.loadingIndicator} />
                  )}
                </View>

                <TouchableOpacity 
                  style={styles.locationButton}
                  onPress={handleGetLocation}
                  disabled={isLoadingLocation}
                >
                  <MaterialIcons 
                    name="my-location" 
                    size={24} 
                    color={isLoadingLocation ? '#999' : '#4A90E2'} 
                  />
                  {isLoadingLocation && (
                    <ActivityIndicator size="small" color="#4A90E2" style={styles.loadingIndicator} />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Rua</Text>
                <TextInput
                  style={[styles.input, errors.street && styles.inputError]}
                  value={street}
                  onChangeText={setStreet}
                  placeholder="Nome da rua"
                />
                {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 2, marginRight: 12 }]}>
                  <Text style={styles.label}>Número</Text>
                  <TextInput
                    style={[styles.input, errors.number && styles.inputError]}
                    value={number}
                    onChangeText={setNumber}
                    placeholder="Número"
                    keyboardType="numeric"
                  />
                  {errors.number && <Text style={styles.errorText}>{errors.number}</Text>}
                </View>

                <View style={[styles.inputContainer, { flex: 3 }]}>
                  <Text style={styles.label}>Complemento</Text>
                  <TextInput
                    style={styles.input}
                    value={complement}
                    onChangeText={setComplement}
                    placeholder="Apto, Bloco, etc."
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Bairro</Text>
                <TextInput
                  style={[styles.input, errors.neighborhood && styles.inputError]}
                  value={neighborhood}
                  onChangeText={setNeighborhood}
                  placeholder="Nome do bairro"
                />
                {errors.neighborhood && <Text style={styles.errorText}>{errors.neighborhood}</Text>}
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 3, marginRight: 12 }]}>
                  <Text style={styles.label}>Cidade</Text>
                  <TextInput
                    style={[styles.input, errors.city && styles.inputError]}
                    value={city}
                    onChangeText={setCity}
                    placeholder="Nome da cidade"
                  />
                  {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
                </View>

                <View style={[styles.inputContainer, { flex: 1 }]}>
                  <Text style={styles.label}>Estado</Text>
                  <TextInput
                    style={[styles.input, errors.state && styles.inputError]}
                    value={state}
                    onChangeText={setState}
                    placeholder="UF"
                    maxLength={2}
                    autoCapitalize="characters"
                  />
                  {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    maxHeight: '70%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  locationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loadingIndicator: {
    position: 'absolute',
    right: 8,
    top: '50%',
    marginTop: -10,
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 