import getImageUrl from '@shared/getImageUrl';
import { WIDTH } from '@utils/index';
import { Box, HStack, Image, ScrollView, Text, View } from 'native-base';
import React, { useCallback, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

type TProps = {
  adsIsActive: boolean;
  data: {
    path: string;
    id: string;
  }[];
};
const Carousel: React.FC<TProps> = ({ data, adsIsActive }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const newActiveIndex = Math.round(
        event.nativeEvent.contentOffset.x / WIDTH
      );
      setActiveIndex(newActiveIndex);
    },
    []
  );
  return (
    <Box w={WIDTH} h={300} position='relative'>
      {!adsIsActive && (
        <View
          position='absolute'
          h='full'
          w='full'
          bg='rgba(0,0,0,0.5)'
          rounded='md'
          zIndex={1}
          justifyContent='center'
          alignItems='center'
        >
          <Text
            color='gray.700'
            fontFamily='heading'
            position='absolute'
            zIndex={2}
          >
            ANÚNCIO DESATIVADO
          </Text>
        </View>
      )}

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        {data.length > 0 ? (
          data.map((item) => (
            <Image
              key={item.id}
              source={{ uri: getImageUrl(item.path) }}
              alt='Image do produto'
              w={WIDTH}
              h='full'
            />
          ))
        ) : (
          <Image
            source={{ uri: getImageUrl(undefined) }}
            alt='Image do produto'
            w={WIDTH}
            h='full'
          />
        )}
      </ScrollView>
      <HStack justifyContent='center' position='absolute' bottom={1} w={WIDTH}>
        {data.map((item) => (
          <View
            key={item.id}
            h={1}
            w={121}
            borderRadius='full'
            mr={1}
            bg={
              activeIndex === data.indexOf(item)
                ? 'rgba(247, 247, 248, .75)'
                : 'rgba(247, 247, 248, .5)'
            }
          />
        ))}
      </HStack>
    </Box>
  );
};

export default Carousel;
