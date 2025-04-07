import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface LogoProps {
  size?: number;
  style?: any;
}

export function Logo({ size = width * 0.5, style }: LogoProps) {
  return (
    <View style={[styles.logoContainer, style]}>
      <Image
        source={require('../assets/images/logo azul.png')}
        style={[styles.logo, { width: size, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
}); 