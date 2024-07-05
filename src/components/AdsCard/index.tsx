import { IResponseGetAds } from '@screens/App/Home/types';
import useGetImage from '@shared/hooks/useGetImage';
import { defaultNoImage } from '@utils/index';
import {
  Avatar,
  Badge,
  Box,
  HStack,
  Heading,
  IPressableProps,
  Image,
  Pressable,
  Text,
} from 'native-base';
import React from 'react';

type TProps = IPressableProps & {
  adsItem: IResponseGetAds;
};

const AdsCard: React.FC<TProps> = ({ adsItem, ...rest }) => {
  const { data: avatarUrl } = useGetImage(adsItem.user.avatar);
  console.tron.log('avatar: ', avatarUrl);
  return (
    <Pressable w='45%' {...rest}>
      <Box position='relative' mb={1}>
        <Image
          rounded='md'
          source={{ uri: adsItem.product_images[0]?.url ?? defaultNoImage }}
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
          <Avatar
            source={{ uri: avatarUrl ?? defaultNoImage }}
            h={7}
            w={7}
            mr={2}
            borderWidth={2}
            borderColor='gray.700'
          />
          <Badge rounded={'full'} bg={adsItem.is_new ? 'blue.900' : 'gray.200'}>
            <Text fontFamily='heading' color='gray.700'>
              {adsItem.is_new ? 'Novo' : 'Usado'}
            </Text>
          </Badge>
        </HStack>
      </Box>
      <Text>{adsItem.name}</Text>
      <Heading fontFamily='heading'>
        {adsItem.price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Heading>
    </Pressable>
  );
};

export default AdsCard;
