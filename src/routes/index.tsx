import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';
import React from 'react';
import { useAuthStore } from 'src/stores/useAuthStore';
import AppRoutes from './app.route';
import AuthRoutes from './auth.route';

const Routes: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600];

  return (
    <Box flex={1} bg='gray.600'>
      <NavigationContainer>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
