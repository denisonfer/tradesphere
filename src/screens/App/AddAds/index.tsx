import Header from '@components/Header';
import { useRoute } from '@react-navigation/native';
import { TAddAdsRouteParams } from '@routes/app.route';
import { VStack } from 'native-base';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AboutProductSection from './AboutProductSection';
import ImageSection from './ImageSection';
import SaleSection from './SaleSection';

const AddAds: React.FC = () => {
  const route = useRoute<TAddAdsRouteParams>();
  const { params } = route;

  return (
    <VStack flex={1} p={6}>
      <Header title={params?.isEditMode ? 'Editar anúncio' : 'Criar anúncio'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageSection />
        <AboutProductSection />
        <SaleSection />
      </KeyboardAwareScrollView>
    </VStack>
  );
};

export default AddAds;
