import Avatar from '@components/Avatar';

import getImageUrl from '@shared/getImageUrl';
import {
  IResponseGetAds,
  IResponseGetMyAdsList,
} from '@shared/interfaces/IProductAds';
import {
  Badge,
  Box,
  HStack,
  Heading,
  IPressableProps,
  Image,
  Pressable,
  Text,
  View,
} from 'native-base';
import React from 'react';

type TProps = IPressableProps & {
  adsItem: IResponseGetMyAdsList | IResponseGetAds;
  onPress: () => void;
};

const AdsCard: React.FC<TProps> = ({ adsItem, onPress, ...rest }) => {
  const avatarUrl = getImageUrl(
    'user' in adsItem ? adsItem.user.avatar : undefined
  );

  const productImageUrl = getImageUrl(adsItem.product_images[0]?.path);
  return (
    <Pressable w='45%' {...rest} onPress={onPress}>
      <Box position='relative' mb={1}>
        {'is_active' in adsItem && !adsItem.is_active && (
          <View
            position='absolute'
            h='full'
            w='full'
            bg='rgba(0,0,0,0.5)'
            rounded='md'
            zIndex={1}
          />
        )}
        {'is_active' in adsItem && !adsItem.is_active && (
          <Text
            color='gray.700'
            fontFamily='heading'
            position='absolute'
            zIndex={2}
            bottom={2}
            left={2}
          >
            ANÚNCIO DESATIVADO
          </Text>
        )}
        <Image
          rounded='md'
          source={{ uri: productImageUrl }}
          alt='Imagem do anuncio'
          h={32}
          resizeMode='cover'
        />
        <HStack
          alignItems='center'
          justifyContent='space-between'
          position='absolute'
          w='full'
          p={1}
        >
          {'user' in adsItem ? (
            <Avatar avatarUrl={avatarUrl} h={7} w={7} renderInProductItem />
          ) : (
            <View h={7} w={7} />
          )}
          <Badge rounded={'full'} bg={adsItem.is_new ? 'gray.900' : 'gray.200'}>
            <Text fontFamily='heading' color='gray.700'>
              {adsItem.is_new ? 'Novo' : 'Usado'}
            </Text>
          </Badge>
        </HStack>
      </Box>
      <Text
        fontFamily='body'
        color={
          'is_active' in adsItem && !adsItem.is_active ? 'gray.400' : 'gray.200'
        }
      >
        {adsItem.name}
      </Text>
      <Heading
        fontFamily='heading'
        fontSize='lg'
        color={
          'is_active' in adsItem && !adsItem.is_active ? 'gray.400' : 'gray.200'
        }
      >
        {adsItem.price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Heading>
    </Pressable>
  );
};

export default AdsCard;
