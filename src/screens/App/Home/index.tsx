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
import React from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import HomeHeader from './HomeHeader';

const Home: React.FC = () => {
  const { colors } = useTheme();

  const mockData = [
    {
      id: 1,
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      title: 'Cadeira gamer',
      description: 'Cadeira gamer com design moderno',
      isNew: false,
      price: 59.9,
      productImage:
        'https://guiaesperto.com.br/wp-content/uploads/2021/02/melhores-cadeiras-gamer.jpg',
    },
    {
      id: 2,
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      title: 'Cadeira gamer',
      description: 'Cadeira gamer com design moderno',
      isNew: true,
      price: 59.9,
      productImage:
        'https://guiaesperto.com.br/wp-content/uploads/2021/02/melhores-cadeiras-gamer.jpg',
    },
    {
      id: 3,
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      title: 'Cadeira gamer',
      description: 'Cadeira gamer com design moderno',
      isNew: true,
      price: 59.9,
      productImage:
        'https://guiaesperto.com.br/wp-content/uploads/2021/02/melhores-cadeiras-gamer.jpg',
    },
    {
      id: 4,
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      title: 'Cadeira gamer',
      description: 'Cadeira gamer com design moderno',
      isNew: true,
      price: 59.9,
      productImage:
        'https://guiaesperto.com.br/wp-content/uploads/2021/02/melhores-cadeiras-gamer.jpg',
    },
    {
      id: 5,
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      title: 'Cadeira gamer',
      description: 'Cadeira gamer com design moderno',
      isNew: false,
      price: 59.9,
      productImage:
        'https://guiaesperto.com.br/wp-content/uploads/2021/02/melhores-cadeiras-gamer.jpg',
    },
  ];
  return (
    <KeyboardAwareFlatList
      ListHeaderComponent={
        <VStack flex={1} p={6}>
          <HomeHeader />

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
              <Heading fontFamily='heading'>4</Heading>
              <Text fontFamily='body'>anúncios ativos</Text>
            </VStack>
            <Button
              variant='ghost'
              flexDir='row'
              endIcon={<ArrowRight size={18} color={colors.blue[900]} />}
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
                <Pressable onPress={() => console.log('Filter')}>
                  <Sliders size={24} color={colors.gray[200]} />
                </Pressable>
              </HStack>
            }
          />
        </VStack>
      }
      data={mockData}
      numColumns={2}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <VStack px='6' pb='6'>
          <AdsCard adsItem={item} />
        </VStack>
      )}
    ></KeyboardAwareFlatList>
  );
};

export default Home;
