import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import { MaskedInput } from './MaskedInput';
import { globalStyles } from '@/app/styles/global';
import { Ionicons } from '@expo/vector-icons';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

interface CountryItem {
  name: { [key: string]: string };
  dial_code: string;
  code: string;
  flag: string;
}

const defaultCountry: CountryItem = {
  name: { pt: 'Brasil' },
  dial_code: '+55',
  code: 'BR',
  flag: '🇧🇷'
};

const getPhoneMask = (countryCode: string) => {
  switch (countryCode) {
    case 'BR':
      return [
        '(',
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
    case 'US':
      return [
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
    default:
      return Array(15).fill(/\d/);
  }
};

export function PhoneInput({ value, onChangeText, error }: PhoneInputProps) {
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(defaultCountry);
  const phoneMask = getPhoneMask(selectedCountry.code);

  const handleCountrySelect = (country: CountryItem) => {
    setSelectedCountry(country);
    setShow(false);
    onChangeText(''); // Limpa o número quando troca o país
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setShow(true)}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={[styles.dialCode, globalStyles.text]}>
          {selectedCountry.dial_code}
        </Text>
        <Ionicons name="chevron-down" size={16} color="#666" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <MaskedInput
          placeholder="Telefone"
          value={value}
          onChangeText={onChangeText}
          error={error}
          mask={phoneMask}
          keyboardType="numeric"
        />
      </View>

      <CountryPicker
        show={show}
        // @ts-ignore
        pickerButtonOnPress={handleCountrySelect}
        onBackdropPress={() => setShow(false)}
        style={{
          modal: {
            height: 500,
          },
          textInput: {
            height: 48,
            borderRadius: 8,
            paddingHorizontal: 16,
            borderColor: '#ddd',
            borderWidth: 1,
            color: '#333',
            fontFamily: 'Poppins_400Regular',
            fontSize: 16,
          },
          countryName: {
            fontFamily: 'Poppins_400Regular',
          },
          dialCode: {
            fontFamily: 'Poppins_400Regular',
          },
          searchMessageText: {
            fontFamily: 'Poppins_400Regular',
          },
        }}
        translation={{
          searchPlaceholder: 'Buscar país...',
          search: 'Buscar',
          emptySearchPlaceholder: 'Nenhum país encontrado',
        }}
        lang="pt"
        enableModalAvoiding
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    gap: 4,
    height: 48,
  },
  flag: {
    fontSize: 24,
  },
  dialCode: {
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    flex: 1,
  },
}); 