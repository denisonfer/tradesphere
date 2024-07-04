import Header from '@components/Header';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TAddAdsRouteParams } from '@routes/app.route';
import { HStack, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';

import Button from '@components/Button';
import AboutProductSection from './AboutProductSection';
import ImageSection from './ImageSection';
import SaleSection from './SaleSection';
import { EPaymentMethods, TAdsFormData, TProductImage } from './types';

const adsSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  price: yup
    .number()
    .transform((_, originalValue) => Number(originalValue.replace(/,/, '.')))
    .positive('O valor não pode ser negativo')
    .typeError('Informe um valor válido')
    .required('Campo valor é obrigatório'),
});

const AddAds: React.FC = () => {
  const { goBack } = useNavigation();
  const route = useRoute<TAddAdsRouteParams>();
  const { params } = route;

  const [productsImages, setProductsImages] = useState<TProductImage[]>([]);
  const [productIsNew, setProductIsNew] = useState('');
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [paymentSelected, setPaymentSelected] = useState<EPaymentMethods[]>([]);
  console.tron.log('paymentSelected: ', paymentSelected);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAdsFormData>({
    resolver: yupResolver(adsSchema),
  });

  const handleAdvance = useCallback(
    (data: TAdsFormData) => {
      const { name, description, price } = data;
      const newAds = {
        name,
        description,
        price,
        is_new: productIsNew === 'true',
        accept_trade: acceptTrade,
        payment_methods: paymentSelected,
      };
      (console as any).tron.log('newAds', newAds);
    },
    [productsImages, productIsNew, acceptTrade, paymentSelected]
  );

  useFocusEffect(
    useCallback(() => {
      if (!params?.isEditMode) {
        reset();
      }
    }, [params?.isEditMode])
  );

  return (
    <VStack flex={1} p={6}>
      <Header title={params?.isEditMode ? 'Editar anúncio' : 'Criar anúncio'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageSection
          productsImages={productsImages}
          setProductsImages={setProductsImages}
        />

        <AboutProductSection
          control={control}
          errors={errors}
          productIsNew={productIsNew}
          setProductIsNew={setProductIsNew}
        />
        <SaleSection
          control={control}
          errors={errors}
          acceptTrade={acceptTrade}
          setAcceptTrade={setAcceptTrade}
          paymentSelected={paymentSelected}
          setPaymentSelected={setPaymentSelected}
        />

        <HStack justifyContent='space-between'>
          <Button
            title='Cancelar'
            bgColor='gray.500'
            isFullWidth
            w='48%'
            onPress={goBack}
          />
          <Button
            title='Avançar'
            isFullWidth
            w='48%'
            onPress={handleSubmit(handleAdvance)}
          />
        </HStack>
      </KeyboardAwareScrollView>
    </VStack>
  );
};

export default AddAds;
