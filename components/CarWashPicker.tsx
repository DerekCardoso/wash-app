import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '@/app/styles/global';
import { CarWash } from '@/types';

interface CarWashPickerProps {
  onCarWashSelected: (carWash: CarWash) => void;
  selectedCarWash?: CarWash;
  carWashes: CarWash[];
}

export function CarWashPicker({ onCarWashSelected, selectedCarWash, carWashes }: CarWashPickerProps) {
  const [selected, setSelected] = useState<CarWash | undefined>(selectedCarWash);

  const handleCarWashSelect = (carWash: CarWash) => {
    setSelected(carWash);
    onCarWashSelected(carWash);
  };

  const formatAddress = (carWash: CarWash) => {
    const { street, number, neighborhood, city, state } = carWash.address;
    return `${street}, ${number} - ${neighborhood}, ${city} - ${state}`;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles.textBold]}>
        Selecione um lava-rápido
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carWashesContainer}
      >
        {carWashes.map((carWash) => (
          <TouchableOpacity
            key={carWash.id}
            style={[
              styles.carWash,
              selected?.id === carWash.id && styles.selectedCarWash
            ]}
            onPress={() => handleCarWashSelect(carWash)}
          >
            <Text style={[styles.carWashName, globalStyles.textBold]}>
              {carWash.name}
            </Text>
            <Text style={[styles.carWashAddress, globalStyles.text]}>
              {formatAddress(carWash)}
            </Text>
            <Text style={[styles.carWashRating, globalStyles.text]}>
              ⭐ {carWash.rating || 'Novo'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  carWashesContainer: {
    paddingHorizontal: 4,
  },
  carWash: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCarWash: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  carWashName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  carWashAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  carWashRating: {
    fontSize: 12,
    color: '#999',
  },
}); 