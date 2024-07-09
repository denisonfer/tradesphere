import Alert from '@components/Alert';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import Header from '@components/Header';
import Loading from '@components/Loading';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TMainStackParams } from '@routes/types';
import getImageUrl from '@shared/getImageUrl';
import {
  HStack,
  Pressable,
  ScrollView,
  Text,
  useTheme,
  useToast,
  View,
  VStack,
} from 'native-base';
import {
  Bank,
  Barcode,
  CreditCard,
  CurrencyDollar,
  PencilSimpleLine,
  Power,
  QrCode,
  Trash,
} from 'phosphor-react-native';
import React, { useCallback, useState } from 'react';
import { useAuthStore } from 'src/stores/useAuthStore';
import Carousel from './Carousel';
import useProductByIdQueries from './hooks/useProductByIdQueries';

type TRouteParams = RouteProp<TMainStackParams, 'AdsDetail'>;
type TNavigationParams = NavigationProp<TMainStackParams, 'AdsDetail'>;
const AdsDetail: React.FC = () => {
  const { colors } = useTheme();
  const toast = useToast();
  const routes = useRoute<TRouteParams>();
  const currentUser = useAuthStore((store) => store.currentUser);
  const { params } = routes;
  const { goBack, navigate } = useNavigation<TNavigationParams>();

  if (!params.AdsId) {
    toast.show({
      description: 'Anúncio não localizado.',
      placement: 'top',
      bg: 'blueLight.900',
      duration: 3000,
    });
    goBack();
  }

  const { getProductByIdQuery, deleteAdsMutation, updateAdsIsActiveMutation } =
    useProductByIdQueries(params.AdsId);
  const { data: adsData, isLoading } = getProductByIdQuery;

  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
  const [isVisibleToggleIsActiveAdsModal, setIsVisibleToggleIsActiveAdsModal] =
    useState(false);

  const avatarUrl = getImageUrl(
    adsData ? adsData.user.avatar : currentUser?.avatar
  );

  const renderPaymentMethodIcon = useCallback(
    (namePayment: string): JSX.Element => {
      const icons = {
        boleto: <Barcode size={18} />,
        cash: <CurrencyDollar size={18} />,
        card: <CreditCard size={18} />,
        deposit: <Bank size={18} />,
        pix: <QrCode size={18} />,
      };

      return (
        icons[namePayment as keyof typeof icons] || <CurrencyDollar size={18} />
      );
    },
    []
  );

  const handleDeleteAds = useCallback(() => {
    deleteAdsMutation.mutate(undefined, {
      onSuccess: () => {
        toast.show({
          description: 'Anúncio excluído com sucesso.',
          placement: 'top',
          bg: 'green.500',
          duration: 3000,
        });
        setIsVisibleDeleteModal(false);
        goBack();
      },
      onError: () => {
        toast.show({
          description: 'Erro ao excluir o anúncio.',
          placement: 'top',
          bg: 'redLight.900',
          duration: 3000,
        });
      },
    });
  }, [deleteAdsMutation, goBack, toast]);

  const handleToggleIsActiveOfAds = useCallback(() => {
    updateAdsIsActiveMutation.mutate(!adsData?.is_active, {
      onSuccess: () => {
        toast.show({
          description: 'Anúncio alterado com sucesso.',
          placement: 'top',
          bg: 'green.500',
          duration: 3000,
        });
        goBack();
      },
      onError: () => {
        toast.show({
          description: 'Erro ao alterar o anúncio.',
          placement: 'top',
          bg: 'redLight.900',
          duration: 3000,
        });
      },
    });
  }, [adsData?.is_active, goBack, toast, updateAdsIsActiveMutation]);

  return (
    <VStack flex={1} pb={10}>
      <Header
        title=''
        buttonRight={
          <Pressable
            onPress={() => navigate('AddAds', { isEditMode: true, adsData })}
          >
            <PencilSimpleLine size={24} />
          </Pressable>
        }
        hasBackButton={true}
      />
      {isLoading || !adsData ? (
        <Loading />
      ) : (
        <ScrollView>
          <Carousel
            data={adsData.product_images}
            adsIsActive={adsData.is_active}
          />

          <VStack px={6}>
            <HStack alignItems='center' mt={5} mb={6}>
              <Avatar avatarUrl={avatarUrl} nameIsVisible />
              <Text fontFamily='body' ml={2}>
                {adsData.user.name}
              </Text>
            </HStack>

            <View
              rounded='full'
              bg='gray.500'
              alignItems='center'
              w={20}
              mb={2}
            >
              <Text fontFamily='heading' color='gray.200'>
                {adsData.is_new ? 'NOVO' : 'USADO	'}
              </Text>
            </View>

            <HStack justifyContent='space-between' mb={2}>
              <Text
                fontFamily='heading'
                fontSize='lg'
                ellipsizeMode='tail'
                flex={1}
              >
                {adsData.name}
              </Text>
              <Text fontFamily='heading' fontSize='lg' color='blueLight.900'>
                {adsData.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Text>
            </HStack>

            <View mb={6}>
              <Text fontFamily='body' color='gray.200' textAlign='justify'>
                {adsData.description}
              </Text>
            </View>

            <HStack mb={4}>
              <Text fontFamily='heading'>Aceita troca?</Text>
              <Text fontFamily='body' ml={2}>
                {adsData.accept_trade ? 'Sim' : 'Não'}
              </Text>
            </HStack>

            <Text fontFamily='heading' mb={2}>
              Meios de pagamento:
            </Text>

            {adsData.payment_methods.map((paymentMethod) => (
              <HStack key={paymentMethod.key}>
                {renderPaymentMethodIcon(paymentMethod.key)}
                <Text fontFamily='body' ml={2} mb={1}>
                  {paymentMethod.name}
                </Text>
              </HStack>
            ))}

            <Button
              title={
                adsData.is_active ? 'Desativar anúncio' : 'Reativar anúncio'
              }
              bg={adsData.is_active ? 'gray.200' : 'blueLight.900'}
              iconLeft={<Power size={18} color={colors.gray[700]} />}
              onPress={() => setIsVisibleToggleIsActiveAdsModal(true)}
              mt={6}
              mb={2}
            />
            <Button
              title='Excluir anúncio'
              bgColor='gray.500'
              iconLeft={<Trash size={18} color={colors.gray[200]} />}
              onPress={() => setIsVisibleDeleteModal(true)}
            />
          </VStack>
        </ScrollView>
      )}

      <Alert
        isVisible={isVisibleToggleIsActiveAdsModal}
        isLoading={updateAdsIsActiveMutation.isPending}
        title={adsData?.is_active ? 'Desativar anúncio' : 'Ativar anúncio'}
        message={
          adsData?.is_active
            ? 'Tem certeza que deseja desativar este anúncio? Ele ficará invisível para os compradores.'
            : 'Tem certeza que deseja reativar este anúncio? Ele ficará visível para os compradores.'
        }
        textButtonOk={adsData?.is_active ? 'Desativar' : 'Ativar'}
        onPressCancel={() => setIsVisibleToggleIsActiveAdsModal(false)}
        onPressOK={handleToggleIsActiveOfAds}
      />

      <Alert
        isVisible={isVisibleDeleteModal}
        isLoading={deleteAdsMutation.isPending}
        title='Excluir anúncio'
        message='Tem certeza que deseja excluir este anúncio?'
        textButtonOk='Excluir'
        onPressCancel={() => setIsVisibleDeleteModal(false)}
        onPressOK={handleDeleteAds}
      />
    </VStack>
  );
};

export default AdsDetail;
