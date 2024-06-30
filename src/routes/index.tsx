import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';
import React from 'react';
import AppRoutes from './app.route';
import AuthRoutes from './auth.route';

const Routes: React.FC = () => {
  const isLogged = false;
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600];

  return (
    <Box flex={1} bg='gray.600'>
      <NavigationContainer>
        {isLogged ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
