import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import SignIn from '@screens/Auth/SignIn';
import SignUp from '@screens/Auth/SignUp';
import React from 'react';

type TAuthRoutes = {
  SignIn: undefined;
  SignUp: undefined;
};

export type TAuthNavigatorRoutesProps = NativeStackNavigationProp<TAuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<TAuthRoutes>();
const AuthRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUp' component={SignUp} />
    </Navigator>
  );
};

export default AuthRoutes;
