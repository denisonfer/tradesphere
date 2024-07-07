import AdsCard from '@components/AdsCard';
import Header from '@components/Header';
import Loading from '@components/Loading';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TMainStackParams } from '@routes/types';
import useGetAdsListQueries from '@shared/hooks/useGetAdsListQueries';
import {
  FlatList,
  HStack,
  Pressable,
  Select,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import { Check, Plus } from 'phosphor-react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { IResponseGetMyAdsList } from '../Home/types';

type TNavigationProps = NavigationProp<TMainStackParams>;

const filterOptions = [
  {
    label: 'Todos',
    value: 'all',
  },

  {
    label: 'Ativos',
    value: 'available',
  },
  {
    label: 'Desativados',
    value: 'unavailable',
  },
];

const MyAds: React.FC = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<TNavigationProps>();

  const [selectedFilter, setSelectedFilter] = useState('all');

  const { getMyAdsListQuery } = useGetAdsListQueries();
  const { data: myAdsList, isLoading, refetch } = getMyAdsListQuery;

  const handleViewAds = useCallback(
    (item: IResponseGetMyAdsList) => {
      navigate('AdsDetail', { adsData: item, isPreviewMode: false });
    },
    [navigate]
  );
  const handleNavigateToAddAds = useCallback(() => {
    navigate('AddAds', {});
  }, [navigate]);

  const myAdsListFiltered = useMemo(() => {
    if (!myAdsList) return [];
    switch (selectedFilter) {
      case 'all':
        return myAdsList;
      case 'available':
        return myAdsList.filter((ads) => ads.is_active);
      case 'unavailable':
        return myAdsList.filter((ads) => !ads.is_active);
      default:
        return myAdsList;
    }
  }, [myAdsList, selectedFilter]);

  return (
    <VStack flex={1}>
      <Header
        title='Meus Anúncios'
        hasBackButton={false}
        buttonRight={
          <Pressable onPress={handleNavigateToAddAds}>
            <Plus size={24} color={colors.gray[100]} />
          </Pressable>
        }
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HStack justifyContent='space-between' px={6}>
            <Text fontFamily='body'>
              {myAdsList?.length ?? 0}{' '}
              {myAdsList?.length === 1 ? 'anúncio' : 'anúncios'}
            </Text>
            <Select
              placeholder='Todos'
              w={130}
              selectedValue={selectedFilter}
              onValueChange={(itemValue) => setSelectedFilter(itemValue)}
              _selectedItem={{
                bg: 'gray.600',
                startIcon: <Check size={18} color={colors.gray[100]} />,
              }}
            >
              {filterOptions.map(({ label, value }) => (
                <Select.Item key={label} label={label} value={value} />
              ))}
            </Select>
          </HStack>

          <FlatList
            data={myAdsListFiltered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AdsCard
                key={item.id}
                adsItem={item}
                onPress={() => handleViewAds(item)}
              />
            )}
            ListEmptyComponent={() => (
              <VStack flex={1} alignItems='center' justifyContent='center'>
                <Text fontFamily='heading'>
                  Você ainda não criou nenhum anúncio.
                </Text>
              </VStack>
            )}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 24,
              gap: 20,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              padding: 24,
            }}
            showsVerticalScrollIndicator={false}
            onRefresh={refetch}
            refreshing={isLoading}
          />
        </>
      )}
    </VStack>
  );
};

export default MyAds;
