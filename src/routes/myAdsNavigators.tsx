import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddAds from '@screens/App/AddAds';
import React from 'react';
import { TMyAdsStackParams } from './types/TMyAdsStackParams';

const { Navigator, Screen } = createNativeStackNavigator<TMyAdsStackParams>();
const MyAdsNavigators: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='AddAds' component={AddAds} />
    </Navigator>
  );
};

export default MyAdsNavigators;
