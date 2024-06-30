import Label from '@components/Label';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import {
  Button,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  useTheme,
  useToast,
} from 'native-base';
import { Plus, X } from 'phosphor-react-native';
import React, { useCallback, useState } from 'react';

type TProductImage = {
  id: string;
  uri: string;
};
const ImageSection: React.FC = () => {
  const { colors } = useTheme();
  const toast = useToast();

  const [productImages, setProductImages] = useState<TProductImage[]>([]);

  const handlePickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (!result.canceled) {
      if (result.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(result.assets[0].uri, {
          size: true,
        });

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            description: 'A imagem deve ter no máximo 5MB',
            placement: 'top',
            bg: 'red.500',
            duration: 3000,
          });
        }

        setProductImages((oldState) => [
          ...oldState,
          {
            id: Math.random().toString(),
            uri: result.assets[0].uri,
          },
        ]);
      }
    }
  }, []);

  const handleRemoveProductImage = useCallback((id: string) => {
    setProductImages((oldState) => oldState.filter((image) => image.id !== id));
  }, []);

  return (
    <VStack>
      <Label text='Imagens' />
      <Text fontFamily='body' mt={1} color='gray.300'>
        Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
      </Text>

      <HStack mt={4} mb={8}>
        {productImages.map((image, index) => (
          <VStack
            h={25}
            w={25}
            bg='gray.500'
            mr={2}
            rounded='lg'
            position='relative'
            key={index}
          >
            <Image
              source={{
                uri: image.uri,
              }}
              alt='Imagem do anúncio'
              w='full'
              h='full'
              resizeMode='cover'
              rounded='lg'
            />
            <IconButton
              icon={<X size={16} color={colors.gray[700]} />}
              variant='solid'
              rounded='full'
              bg='gray.200'
              h={4}
              w={4}
              _pressed={{ bg: 'gray.400' }}
              position='absolute'
              top={1}
              right={1}
              onPress={() => handleRemoveProductImage(image.id)}
            />
          </VStack>
        ))}
        {productImages.length < 3 && (
          <Button
            h={25}
            w={25}
            bg='gray.500'
            rounded='lg'
            _pressed={{ bg: 'gray.400' }}
            onPress={handlePickImage}
          >
            <Plus size={24} color={colors.gray[400]} />
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export default ImageSection;