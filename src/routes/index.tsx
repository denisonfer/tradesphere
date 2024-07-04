import {
  DefaultTheme,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native';
import { Box, useTheme } from 'native-base';
import React from 'react';
import { useAuthStore } from 'src/stores/useAuthStore';
import AppRoutes from './app.route';
import AuthRoutes from './auth.route';
import { TAllRoutesParams } from './types/TAllRoutesParams';

export type RootStackParams = {
  Login: undefined;
  Main: undefined;
} & TAllRoutesParams;

export type AppRoutes = keyof RootStackParams;
export type AppRouteParams<T extends AppRoutes> = RootStackParams[T];
export type AppRouteUseParams<T extends AppRoutes> = RouteProp<
  RootStackParams,
  T
>;

const Routes: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600];

  return (
    <Box flex={1} bg='gray.600'>
      <NavigationContainer>
        {!isAuthenticated ? <AuthRoutes /> : <AppRoutes />}
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
