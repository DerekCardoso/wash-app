import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '@/app/styles/global';

interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

interface TimeSlotPickerProps {
  onTimeSelected: (time: string) => void;
  selectedTime?: string;
  availableSlots: TimeSlot[];
}

export function TimeSlotPicker({ onTimeSelected, selectedTime, availableSlots }: TimeSlotPickerProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(selectedTime);

  const handleTimeSelect = (time: string) => {
    setSelectedSlot(time);
    onTimeSelected(time);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles.textBold]}>
        Selecione um horário
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.slotsContainer}
      >
        {availableSlots.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            style={[
              styles.slot,
              selectedSlot === slot.time && styles.selectedSlot,
              !slot.isAvailable && styles.unavailableSlot
            ]}
            onPress={() => slot.isAvailable && handleTimeSelect(slot.time)}
            disabled={!slot.isAvailable}
          >
            <Text style={[
              styles.slotText,
              globalStyles.text,
              selectedSlot === slot.time && styles.selectedSlotText,
              !slot.isAvailable && styles.unavailableSlotText
            ]}>
              {slot.time}
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
  slotsContainer: {
    paddingHorizontal: 4,
  },
  slot: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  unavailableSlot: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
  },
  slotText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSlotText: {
    color: '#fff',
  },
  unavailableSlotText: {
    color: '#999',
  },
}); 