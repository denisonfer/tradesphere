import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/App/Home';
import React from 'react';

const { Navigator, Screen } = createNativeStackNavigator();
const AppRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen name='Home' component={Home} />
    </Navigator>
  );
};

export default AppRoutes;
