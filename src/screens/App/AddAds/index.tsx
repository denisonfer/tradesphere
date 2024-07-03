import Header from '@components/Header';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect, useRoute } from '@react-navigation/native';
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
import { TAdsFormData, TProductImage } from './types';

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
  const route = useRoute<TAddAdsRouteParams>();
  const { params } = route;

  const [productsImages, setProductsImages] = useState<TProductImage[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAdsFormData>({
    resolver: yupResolver(adsSchema),
  });

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

        <AboutProductSection control={control} errors={errors} />
        <SaleSection control={control} errors={errors} />

        <HStack justifyContent='space-between'>
          <Button
            title='Cancelar'
            bgColor='gray.500'
            isFullWidth
            w='48%'
            onPress={handleSubmit((console as any).tron.log)}
          />
          <Button
            title='Avançar'
            isFullWidth
            w='48%'
            onPress={handleSubmit((console as any).tron.log)}
          />
        </HStack>
      </KeyboardAwareScrollView>
    </VStack>
  );
};

export default AddAds;
