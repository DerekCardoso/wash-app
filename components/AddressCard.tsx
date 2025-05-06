import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Address } from '@/types/address';
import { globalStyles } from '@/styles/global';

interface AddressCardProps {
  address: Address;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onPress,
  onEdit,
  onDelete,
}) => {
  const getAddressString = () => {
    const parts = [
      address.street,
      address.number,
      address.complement,
      address.neighborhood,
      `${address.city} - ${address.state}`,
      address.zipCode,
    ].filter(Boolean);

    return parts.join(', ');
  };

  return (
    <TouchableOpacity
      style={[styles.container, address.isDefault && styles.defaultContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {address.isDefault ? 'Endereço Principal' : 'Endereço'}
          </Text>
          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Ionicons name="star" size={16} color="#FF6B00" />
            </View>
          )}
        </View>

        <Text style={styles.address}>{getAddressString()}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onEdit}
          >
            <Ionicons name="pencil" size={20} color="#007AFF" />
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={onDelete}
          >
            <Ionicons name="trash" size={20} color="#FF3B30" />
            <Text style={[styles.actionText, styles.deleteText]}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    ...globalStyles.shadow,
  },
  defaultContainer: {
    borderWidth: 1,
    borderColor: '#FF6B00',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: '#FFF5E6',
    padding: 4,
    borderRadius: 4,
  },
  address: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 20,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#007AFF',
  },
  deleteText: {
    color: '#FF3B30',
  },
}); 