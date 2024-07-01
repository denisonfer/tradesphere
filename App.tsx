import Loading from '@components/Loading';
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from '@expo-google-fonts/karla';

import '@configs/reactotron';

import { queryClient } from '@configs/client';
import Routes from '@routes/index';
import { theme } from '@styles/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <GestureHandlerRootView>
      <NativeBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {!fontsLoaded ? <Loading /> : <Routes />}
        </QueryClientProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
