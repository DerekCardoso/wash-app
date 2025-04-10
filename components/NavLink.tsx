import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { globalStyles } from '@/app/styles/global';

interface NavLinkProps {
  text: string;
  linkText: string;
  route: string;
  style?: any;
}

export function NavLink({ text, linkText, route, style }: NavLinkProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, globalStyles.text]}>{text} </Text>
      <TouchableOpacity onPress={() => router.replace(route as any)}>
        <Text style={[styles.link, globalStyles.textBold]}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: '#666',
  },
  link: {
    color: '#2f95dc',
  },
}); 