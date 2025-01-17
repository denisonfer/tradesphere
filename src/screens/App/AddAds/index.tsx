import Header from '@components/Header';
import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HStack, VStack, useToast } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';

import Button from '@components/Button';
import { TMainStackParams } from '@routes/types';
import { MaskService } from 'react-native-masked-text';
import AboutProductSection from './AboutProductSection';
import ImageSection from './ImageSection';
import SaleSection from './SaleSection';
import useCreateAds from './hooks/useCreateAds';
import { EPaymentMethods, TAdsFormData, TProductImage } from './types';

type TAddAdsRouteParams = RouteProp<TMainStackParams, 'AddAds'>;

const adsSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  price: yup
    .number()
    .transform((_, original) => MaskService.toRawValue('money', original))
    .positive('O valor não pode ser negativo')
    .typeError('Informe um valor válido')
    .required('Campo valor é obrigatório'),
});

const AddAds: React.FC = () => {
  const { goBack } = useNavigation();
  const route = useRoute<TAddAdsRouteParams>();
  const { params } = route;
  const { isEditMode, adsData } = params;

  const toast = useToast();
  if (isEditMode && !adsData) {
    toast.show({
      description: 'Anúncio não localizado.',
      placement: 'top',
      bg: 'blueLight.900',
      duration: 3000,
    });
    goBack();
  }

  const [oldImagesId, setOldImagesId] = useState<string[]>([]);
  const [productsImages, setProductsImages] = useState<TProductImage[]>([]);
  const [productIsNew, setProductIsNew] = useState('true');
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [paymentSelected, setPaymentSelected] = useState<EPaymentMethods[]>([]);

  const { handleCreateAds, handleUpdateAds, isLoading } = useCreateAds();

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
      if (productsImages.length === 0) {
        return toast.show({
          description: 'Adicione pelo menos uma imagem',
          placement: 'top',
          bg: 'red.500',
          duration: 3000,
        });
      }

      if (paymentSelected.length === 0) {
        return toast.show({
          description: 'Selecione pelo menos um meio de pagamento',
          placement: 'top',
          bg: 'red.500',
          duration: 3000,
        });
      }
      const { name, description, price } = data;
      const newAds = {
        name,
        description,
        price,
        productIsNew,
        acceptTrade,
        paymentSelected,
      };

      if (isEditMode) {
        handleUpdateAds({ ...newAds, adsId: adsData!.id }, productsImages);
      } else {
        handleCreateAds(newAds, productsImages);
      }
    },
    [
      productsImages,
      productIsNew,
      acceptTrade,
      paymentSelected,
      handleCreateAds,
      handleUpdateAds,
      adsData,
    ]
  );

  const handlePaymentSelector = useCallback(
    (value: EPaymentMethods) => {
      if (paymentSelected.includes(value)) {
        setPaymentSelected((oldState) =>
          oldState.filter((item) => item !== value)
        );
      } else {
        setPaymentSelected((oldState) => [...oldState, value]);
      }
    },
    [paymentSelected]
  );

  useEffect(() => {
    if (isEditMode && adsData) {
      reset({
        name: adsData.name,
        description: adsData.description,
        price: String(adsData.price * 100) as any,
      });
      setProductIsNew(adsData.is_new ? 'true' : 'false');
      setAcceptTrade(adsData.accept_trade);
      setPaymentSelected(
        adsData.payment_methods.map((item) => item.key as EPaymentMethods)
      );

      adsData.product_images.forEach((image) => {
        const fileExtension = image.path.split('.').pop();

        setOldImagesId(adsData.product_images.map((image) => image.id));

        setProductsImages((oldState) => [
          ...oldState,
          {
            uri: image.path,
            id: image.id,
            type: `image/${fileExtension}`,
            name: `${image.id}.${fileExtension}`,
          } as TProductImage,
        ]);
      });
    }
  }, [adsData, isEditMode]);

  return (
    <VStack flex={1}>
      <Header title={isEditMode ? 'Editar anúncio' : 'Criar anúncio'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <VStack px={6} pb={24}>
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
            handlePaymentSelector={handlePaymentSelector}
          />
        </VStack>
      </KeyboardAwareScrollView>

      <HStack
        justifyContent='space-between'
        bg='gray.700'
        px={6}
        pb={8}
        pt={4}
        position='absolute'
        bottom={0}
      >
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
          isLoading={isLoading}
          onPress={handleSubmit(handleAdvance)}
        />
      </HStack>
    </VStack>
  );
};

export default AddAds;
