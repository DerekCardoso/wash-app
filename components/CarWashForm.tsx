import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input } from '../../atoms/Input/Input';
import { PhoneInput } from '../../atoms/PhoneInput/PhoneInput';
import { FormActions } from '../../molecules/FormActions';
import { theme } from '../../../constants/theme';
import { CarWash } from '../../../types';

interface CarWashFormProps {
  initialData?: Partial<CarWash>;
  onSubmit: (data: Partial<CarWash>) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const CarWashForm: React.FC<CarWashFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [street, setStreet] = useState(initialData?.address?.street || '');
  const [number, setNumber] = useState(initialData?.address?.number || '');
  const [neighborhood, setNeighborhood] = useState(initialData?.address?.neighborhood || '');
  const [city, setCity] = useState(initialData?.address?.city || '');
  const [state, setState] = useState(initialData?.address?.state || '');

  const handleSubmit = () => {
    const formData: Partial<CarWash> = {
      name,
      phone,
      email,
      address: {
        street,
        number,
        neighborhood,
        city,
        state,
        coordinates: initialData?.address?.coordinates || {
          latitude: 0,
          longitude: 0,
        },
      },
    };

    onSubmit(formData);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Input
          label="Nome do Lava-rápido"
          value={name}
          onChangeText={setName}
          placeholder="Digite o nome do lava-rápido"
          required
        />

        <PhoneInput
          label="Telefone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Digite o telefone"
          required
        />

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite o email"
          keyboardType="email-address"
          required
        />

        <Input
          label="Rua"
          value={street}
          onChangeText={setStreet}
          placeholder="Digite a rua"
          required
        />

        <Input
          label="Número"
          value={number}
          onChangeText={setNumber}
          placeholder="Digite o número"
          required
        />

        <Input
          label="Bairro"
          value={neighborhood}
          onChangeText={setNeighborhood}
          placeholder="Digite o bairro"
          required
        />

        <Input
          label="Cidade"
          value={city}
          onChangeText={setCity}
          placeholder="Digite a cidade"
          required
        />

        <Input
          label="Estado"
          value={state}
          onChangeText={setState}
          placeholder="Digite o estado"
          required
        />

        <FormActions
          onSubmit={handleSubmit}
          onCancel={onCancel}
          loading={loading}
          disabled={!name || !phone || !email || !street || !number || !neighborhood || !city || !state}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
}); 