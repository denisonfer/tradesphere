import { Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const AdsDetail: React.FC = () => {
  /*   const { navigate } = useNavigation<TNavigationProps>();
  const routes = useRoute<TRouteParams>();
  (console as any).tron.log('routes: ', routes.params); */

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
