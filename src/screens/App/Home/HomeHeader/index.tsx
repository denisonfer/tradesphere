import Avatar from '@components/Avatar';
import Button from '@components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TMainStackParams } from '@routes/types';
import getImageUrl from '@shared/getImageUrl';
import { HStack, useTheme } from 'native-base';
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
      <Avatar avatarUrl={avatarUrl} nameUser={currentUser?.name} hasWelcome />

      <Button
        iconLeft={<Plus size={24} color={colors.gray[700]} />}
        title='Criar anúncio'
        onPress={() => navigate('AddAds', {})}
      />
    </HStack>
  );
};

export default HomeHeader;
