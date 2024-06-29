import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '@screens/App/Home';
import MyAds from '@screens/App/MyAds';
import SignOut from '@screens/App/SignOut';
import { useTheme } from 'native-base';
import { House, SignOut as IconSignOut, Tag } from 'phosphor-react-native';
import React from 'react';
import { Platform } from 'react-native';

type TAppRoutes = {
  Home: undefined;
  MyAds: undefined;
  SignOut: undefined;
};

export type TAppNavigatorRoutesProps = BottomTabNavigationProp<TAppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<TAppRoutes>();
const AppRoutes: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
        },
      }}
    >
      <Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />
      <Screen
        name='MyAds'
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => <Tag size={24} color={color} />,
        }}
      />
      <Screen
        name='SignOut'
        component={SignOut}
        options={{
          tabBarIcon: () => (
            <IconSignOut size={24} color={colors.redLight[900]} />
          ),
        }}
      />
    </Navigator>
  );
};

export default AppRoutes;
