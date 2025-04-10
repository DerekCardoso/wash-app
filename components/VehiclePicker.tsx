import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '@/app/styles/global';
import { Vehicle } from '@/types';

interface VehiclePickerProps {
  onVehicleSelected: (vehicle: Vehicle) => void;
  selectedVehicle?: Vehicle;
  vehicles: Vehicle[];
}

export function VehiclePicker({ onVehicleSelected, selectedVehicle, vehicles }: VehiclePickerProps) {
  const [selected, setSelected] = useState<Vehicle | undefined>(selectedVehicle);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelected(vehicle);
    onVehicleSelected(vehicle);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles.textBold]}>
        Selecione um veículo
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.vehiclesContainer}
      >
        {vehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[
              styles.vehicle,
              selected?.id === vehicle.id && styles.selectedVehicle
            ]}
            onPress={() => handleVehicleSelect(vehicle)}
          >
            <Text style={[styles.vehicleModel, globalStyles.textBold]}>
              {vehicle.model}
            </Text>
            <Text style={[styles.vehiclePlate, globalStyles.text]}>
              {vehicle.plate}
            </Text>
            <Text style={[styles.vehicleColor, globalStyles.text]}>
              {vehicle.color}
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
  vehiclesContainer: {
    paddingHorizontal: 4,
  },
  vehicle: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedVehicle: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  vehicleModel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  vehiclePlate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  vehicleColor: {
    fontSize: 14,
    color: '#666',
  },
}); 