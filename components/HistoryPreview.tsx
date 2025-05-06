import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/app/styles/global';
import { StarRating } from '@/components/StarRating';

interface HistoryPreviewProps {
  lastOrder: {
    date: string;
    carWashName: string;
    service: string;
    rating?: number;
  };
  onPress: () => void;
}

export function HistoryPreview({ lastOrder, onPress }: HistoryPreviewProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessibilityLabel={`Histórico: ${lastOrder.carWashName}`}
      accessibilityRole="button"
    >
      <View style={styles.header}>
        <Text style={[globalStyles.textBold, styles.date]}>
          {lastOrder.date}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>

      <View style={styles.content}>
        <Text style={[globalStyles.textBold, styles.carWashName]}>
          {lastOrder.carWashName}
        </Text>
        <Text style={[globalStyles.text, styles.service]}>
          {lastOrder.service}
        </Text>
      </View>

      {lastOrder.rating !== undefined ? (
        <View style={styles.ratingContainer}>
          <StarRating value={lastOrder.rating} size={16} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.rateButton}
          onPress={() => {/* TODO: Implementar avaliação */}}
        >
          <Text style={[globalStyles.text, styles.rateButtonText]}>
            Avaliar serviço
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    marginBottom: 12,
  },
  carWashName: {
    fontSize: 16,
    marginBottom: 4,
  },
  service: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  rateButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
}); 