import { View, Text, TouchableOpacity } from 'react-native';

interface CarWashCardProps {
  name: string;
  address: string;
  services: string[];
  onPress: () => void;
}

export function CarWashCard({ name, address, services, onPress }: CarWashCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{name}</Text>
        <Text>{address}</Text>
        <View>
          {services.map((service, index) => (
            <Text key={index}>{service}</Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}