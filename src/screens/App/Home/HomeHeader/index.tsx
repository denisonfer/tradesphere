import Button from '@components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TMainStackParams } from '@routes/types';
import getImageUrl from '@shared/getImageUrl';
import { Avatar, HStack, Heading, Text, VStack, useTheme } from 'native-base';
import { Plus } from 'phosphor-react-native';
import React from 'react';
import { useAuthStore } from 'src/stores/useAuthStore';

type THomeHeaderNavigationProp = NavigationProp<TMainStackParams>;
const HomeHeader: React.FC = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<THomeHeaderNavigationProp>();
  const currentUser = useAuthStore((state) => state.currentUser);
  const avatarUrl = getImageUrl(currentUser?.avatar);

  return (
    <HStack pt={10} mb={8} alignItems='center' justifyContent='space-between'>
      <Avatar
        borderWidth={2}
        borderColor='blueLight.900'
        bg='gray.400'
        source={{
          uri: avatarUrl,
        }}
      />

      <VStack flex={1} ml={4}>
        <Text fontFamily='body' flex={1}>
          Boas Vindas,
        </Text>
        <Heading fontFamily='heading'>{currentUser?.name ?? ''}</Heading>
      </VStack>

      <Button
        iconLeft={<Plus size={24} color={colors.gray[700]} />}
        title='Criar anúncio'
        onPress={() => navigate('AddAds', {})}
      />
    </HStack>
  );
};

export default HomeHeader;
