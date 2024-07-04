import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, useTheme } from 'native-base';
import React from 'react';
import { useAuthStore } from 'src/stores/useAuthStore';
import AppRoutes from './app.route';
import AuthRoutes from './auth.route';
import { TRootStackParams } from './types';

const { Navigator, Screen } = createNativeStackNavigator<TRootStackParams>();
const Routes: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600];

  return (
    <Box flex={1} bg='gray.600'>
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Screen name='Main' component={AppRoutes} />
          ) : (
            <Screen name='Login' component={AuthRoutes} />
          )}
        </Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
