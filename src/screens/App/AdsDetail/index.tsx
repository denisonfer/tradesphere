import Header from '@components/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TMainStackParams } from '@routes/types';
import { Text, VStack } from 'native-base';
import { PencilSimpleLine } from 'phosphor-react-native';
import React from 'react';
import Carousel from './Carousel';

type TRouteParams = RouteProp<TMainStackParams, 'AdsDetail'>;
const AdsDetail: React.FC = () => {
  const routes = useRoute<TRouteParams>();
  const { params } = routes;

  if (!params) {
    return null;
  }

  const { adsData } = params;
  console.tron.log('adsData: ', adsData);

  /*   const { navigate } = useNavigation<TNavigationProps>();
  (console as any).tron.log('routes: ', routes.params); */

  return (
    <VStack flex={1}>
      <Header
        title=''
        buttonRight={<PencilSimpleLine size={24} />}
        hasBackButton={true}
      />
      <Carousel data={adsData.product_images} />
      <Text>AdsDetail</Text>
    </VStack>
  );
};

export default AdsDetail;
