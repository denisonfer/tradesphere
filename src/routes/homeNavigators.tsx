import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddAds from '@screens/App/AddAds';
import AdsDetail from '@screens/App/AdsDetail';
import Home from '@screens/App/Home';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THomeStackParams } from './types/THomeStackParams';

const { Navigator, Screen } = createNativeStackNavigator<THomeStackParams>();
const HomeNavigators: React.FC = () => {
  const { top } = useSafeAreaInsets();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { marginTop: top, overflow: 'visible' },
      }}
    >
      <Screen name='Resume' component={Home} />
      <Screen name='AddAds' component={AddAds} />
      <Screen name='AdsDetail' component={AdsDetail} />
    </Navigator>
  );
};

export default HomeNavigators;
