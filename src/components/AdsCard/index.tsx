import { IProductAds } from '@shared/interfaces/IProductAds';
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
  adsItem: IProductAds;
};

const AdsCard: React.FC<TProps> = ({ adsItem, ...rest }) => {
  return (
    <Pressable w='45%' {...rest}>
      <Box position='relative' mb={1}>
        <Image
          rounded='md'
          source={{ uri: adsItem.productImage }}
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
            source={{ uri: adsItem.avatar }}
            h={7}
            w={7}
            mr={2}
            borderWidth={2}
            borderColor='gray.700'
          />
          <Badge rounded={'full'} bg={adsItem.isNew ? 'blue.900' : 'gray.200'}>
            <Text fontFamily='heading' color='gray.700'>
              {adsItem.isNew ? 'Novo' : 'Usado'}
            </Text>
          </Badge>
        </HStack>
      </Box>
      <Text>{adsItem.title}</Text>
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
