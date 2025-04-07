import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useAuthContext } from './providers/AuthProvider';
import SplashScreenComponent from './components/SplashScreen';

export default function Index() {
  const { user } = useAuthContext() ?? { user: null };
  const [isReady, setIsReady] = useState(false);

  const handleAnimationComplete = () => {
    // Redireciona para a tela apropriada baseado no estado de autenticação
    if (user) {
      router.replace('/(customer)/home');
    } else {
      router.replace('/(auth)/login');
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        // Mantém a splash screen nativa visível
        await SplashScreen.preventAutoHideAsync();
        
        // Aguarda 3 segundos para mostrar nossa splash screen personalizada
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Esconde a splash screen nativa
        await SplashScreen.hideAsync();
        
        // Marca que estamos prontos para mostrar nossa splash screen
        setIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    };

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <SplashScreenComponent onAnimationComplete={handleAnimationComplete} />
    </View>
  );
}

