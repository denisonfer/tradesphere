import Avatar from '@components/Avatar';
import Button from '@components/Button';
import Header from '@components/Header';
import Loading from '@components/Loading';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TMainStackParams } from '@routes/types';
import getImageUrl from '@shared/getImageUrl';
import {
  HStack,
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
import React, { useCallback } from 'react';
import { useAuthStore } from 'src/stores/useAuthStore';
import Carousel from './Carousel';
import useGetProductByIdQuery from './hooks/useGetProductByIdQuery';

type TRouteParams = RouteProp<TMainStackParams, 'AdsDetail'>;
const AdsDetail: React.FC = () => {
  const { colors } = useTheme();
  const toast = useToast();
  const routes = useRoute<TRouteParams>();
  const currentUser = useAuthStore((store) => store.currentUser);
  const { params } = routes;
  const { goBack } = useNavigation();

  if (!params.AdsId) {
    toast.show({
      description: 'Anúncio não localizado.',
      placement: 'top',
      bg: 'blueLight.900',
      duration: 3000,
    });
    goBack();
  }

  (console as any).tron.log('params: ', params.AdsId);

  const { getProductByIdQuery } = useGetProductByIdQuery(params.AdsId);
  const { data: adsData, isLoading } = getProductByIdQuery;

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
  return (
    <VStack flex={1} pb={10}>
      <Header
        title=''
        buttonRight={<PencilSimpleLine size={24} />}
        hasBackButton={true}
      />
      {isLoading || !adsData ? (
        <Loading />
      ) : (
        <ScrollView>
          <Carousel data={adsData.product_images} />

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
              onPress={() => {}}
              mt={6}
              mb={2}
            />
            <Button
              title='Excluir anúncio'
              bgColor='gray.500'
              iconLeft={<Trash size={18} color={colors.gray[200]} />}
              onPress={() => {}}
            />
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
};

export default AdsDetail;
