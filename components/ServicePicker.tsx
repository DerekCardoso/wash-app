import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '@/app/styles/global';
import { Service } from '@/types';

interface ServicePickerProps {
  onServiceSelected: (service: Service) => void;
  selectedService?: Service;
  services: Service[];
}

export function ServicePicker({ onServiceSelected, selectedService, services }: ServicePickerProps) {
  const [selected, setSelected] = useState<Service | undefined>(selectedService);

  const handleServiceSelect = (service: Service) => {
    setSelected(service);
    onServiceSelected(service);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles.textBold]}>
        Selecione um serviço
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.servicesContainer}
      >
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.service,
              selected?.id === service.id && styles.selectedService
            ]}
            onPress={() => handleServiceSelect(service)}
          >
            <Text style={[styles.serviceName, globalStyles.textBold]}>
              {service.name}
            </Text>
            <Text style={[styles.serviceDescription, globalStyles.text]}>
              {service.description}
            </Text>
            <Text style={[styles.servicePrice, globalStyles.text]}>
              R$ {service.price.toFixed(2)}
            </Text>
            <Text style={[styles.serviceDuration, globalStyles.text]}>
              ⏱️ {service.duration} min
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
  servicesContainer: {
    paddingHorizontal: 4,
  },
  service: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedService: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  serviceName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 12,
    color: '#999',
  },
}); 