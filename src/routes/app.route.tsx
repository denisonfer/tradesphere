import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddAds from '@screens/App/AddAds';
import AdsDetail from '@screens/App/AdsDetail';
import React from 'react';
import TabNavigators from './tabNavigators';
import { TAllRoutesParams } from './types/TAllRoutesParams';

const { Navigator, Screen } = createNativeStackNavigator<TAllRoutesParams>();
const AppRoutes: React.FC = () => {
  return (
    <Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Home' component={TabNavigators} />
      <Screen name='AddAds' component={AddAds} />
      <Screen name='AdsDetail' component={AdsDetail} />
    </Navigator>
  );
};

export default AppRoutes;
