import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { TAppNavigatorRoutesProps } from '@routes/app.route';
import { Avatar, HStack, Heading, Text, VStack, useTheme } from 'native-base';
import { Plus } from 'phosphor-react-native';
import React from 'react';

const HomeHeader: React.FC = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<TAppNavigatorRoutesProps>();

  return (
    <HStack pt={10} mb='8' alignItems='center' justifyContent='space-between'>
      <Avatar
        borderWidth={2}
        borderColor='blueLight.900'
        bg='gray.400'
        source={{
          uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}
      />

      <VStack flex={1} ml={4}>
        <Text fontFamily='body' flex={1}>
          Boas Vindas,
        </Text>
        <Heading fontFamily='heading'>Mara!</Heading>
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
