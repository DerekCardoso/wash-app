import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | number;
  style?: any;
}

export function Logo({ size = 'medium', style }: LogoProps) {
  const getSize = () => {
    if (typeof size === 'string') {
      switch (size) {
        case 'small':
          return width * 0.15;
        case 'medium':
          return width * 0.3;
        case 'large':
          return width * 0.5;
        default:
          return width * 0.3;
      }
    }
    return size;
  };

  return (
    <View style={[styles.logoContainer, style]}>
      <Image
        source={require('../assets/images/logo azul.png')}
        style={[styles.logo, { width: getSize(), height: getSize() }]}
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