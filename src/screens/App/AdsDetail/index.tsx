import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TMainStackParams } from '@routes/types';
import { Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type TAdsDetailNavigationProps = NavigationProp<TMainStackParams, 'AdsDetail'>;
type TAdsDetailRouteParams = RouteProp<TMainStackParams, 'AdsDetail'>;

const AdsDetail: React.FC = () => {
  const { navigate } = useNavigation<TAdsDetailNavigationProps>();
  const routes = useRoute();
  (console as any).tron.log('routes: ', routes.params);

  //navigate('AddAds', { isEditMode: true });

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AdsDetail;
