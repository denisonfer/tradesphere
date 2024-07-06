import AdsCard from '@components/AdsCard';
import Input from '@components/Input';
import {
  Button,
  Divider,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import {
  ArrowRight,
  MagnifyingGlass,
  Sliders,
  Tag,
} from 'phosphor-react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Modalize } from 'react-native-modalize';
import HomeHeader from './HomeHeader';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TMainStackParams } from '@routes/types';
import FilterModal from './FilterModal';
import useHomeQueries from './hooks/useHomeQueries';
import { IResponseGetAds } from './types';

type THomeNavigationProps = NavigationProp<TMainStackParams, 'Home'>;

const Home: React.FC = () => {
  const modalRef = useRef<Modalize>(null);
  const { navigate } = useNavigation<THomeNavigationProps>();
  const { colors } = useTheme();

  const { getMyAdsListQuery, getAdsListQuery } = useHomeQueries();
  const { data: myAdsList, isLoading: isLoadingMyAds } = getMyAdsListQuery;
  const { data: adsList } = getAdsListQuery;

  const MyAdsListQuantity = useMemo(() => {
    if (isLoadingMyAds) return 0;
    if (!myAdsList) return 0;
    return myAdsList.length;
  }, [myAdsList]);

  const handleNavigateToMyAds = useCallback(() => {
    navigate('Home', { screen: 'MyAds' });
  }, []);

  const handleNavigateToAdsDetail = useCallback((item: IResponseGetAds) => {
    navigate('AdsDetail', { adsData: item, isPreviewMode: false });
  }, []);

  return (
    <VStack flex={1} px={6} pt={6}>
      <HomeHeader />

      <KeyboardAwareFlatList
        ListHeaderComponent={
          <VStack>
            <Text fontFamily='body' mb={4}>
              Seus produtos anunciados para venda
            </Text>
            <HStack
              px={4}
              py={3}
              rounded='md'
              alignItems='center'
              justifyContent='space-between'
              bg='rgba(100, 122,199, 0.1)'
            >
              <Tag size={24} color={colors.blue[900]} />
              <VStack flex={1} ml={4}>
                <Heading fontFamily='heading'>{MyAdsListQuantity}</Heading>
                <Text fontFamily='body'>
                  {MyAdsListQuantity > 1 ? 'anúncios ativos' : 'anúncio ativo'}
                </Text>
              </VStack>
              <Button
                variant='ghost'
                flexDir='row'
                endIcon={<ArrowRight size={18} color={colors.blue[900]} />}
                onPress={handleNavigateToMyAds}
              >
                <Text fontFamily='heading' color={colors.blue[900]}>
                  Meus anúncios
                </Text>
              </Button>
            </HStack>

            <Text fontFamily='body' mb={4} mt={8}>
              Compre produtos variados
            </Text>

            <Input
              placeholder='Buscar anúncio'
              InputRightElement={
                <HStack alignItems='center' space={2} mr={2}>
                  <Pressable onPress={() => console.log('Search')}>
                    <MagnifyingGlass size={24} color={colors.gray[200]} />
                  </Pressable>
                  <Divider
                    bg='gray.400'
                    thickness='2'
                    mx='2'
                    orientation='vertical'
                    h={5}
                  />
                  <Pressable onPress={() => modalRef.current?.open()}>
                    <Sliders size={24} color={colors.gray[200]} />
                  </Pressable>
                </HStack>
              }
            />
          </VStack>
        }
        data={adsList ?? []}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 24,
          gap: 20,
        }}
        renderItem={({ item }: { item: IResponseGetAds }) => (
          <AdsCard
            adsItem={item}
            onPress={() => handleNavigateToAdsDetail(item)}
          />
        )}
        ListEmptyComponent={<Text>Nenhum anúncio encontrado</Text>}
      />

      <Modalize ref={modalRef} adjustToContentHeight>
        <FilterModal modalRef={modalRef} />
      </Modalize>
    </VStack>
  );
};

export default Home;
