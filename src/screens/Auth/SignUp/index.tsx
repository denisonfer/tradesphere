import Button from '@components/Button';
import Input from '@components/Input';
import { useMutation } from '@tanstack/react-query';
import {
  Avatar,
  Box,
  Center,
  Heading,
  IconButton,
  Text,
  VStack,
  useTheme,
  useToast,
} from 'native-base';
import React, { useCallback, useState } from 'react';

import Logo from '@assets/images/logo.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { PencilSimpleLine } from 'phosphor-react-native';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { api } from 'src/services/api';
import * as yup from 'yup';

type TFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPass: string;
};

const signUpSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  phone: yup
    .string()
    .required('Telefone obrigatório. Ex.: (99)999999999')
    .matches(/^\d{11}$/, 'Telefone inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 dígitos'),
  confirmPass: yup
    .string()
    .required('Confirme sua senha')
    .oneOf([yup.ref('password')], 'Senhas diferentes'),
});

const defaultUserImage =
  'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png';

const SignUp: React.FC = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const [userImage, setUserImage] = useState(defaultUserImage);
  const toast = useToast();

  const mutation = useMutation({
    mutationKey: ['auth', 'signUp'],
    mutationFn: async (data: TFormData) => {
      const { name, email, phone, password } = data;

      const fileExtension = userImage.split('.').pop();
      const formData = new FormData();
      formData.append('avatar', {
        uri: userImage,
        name: `${name}.${fileExtension}`,
        type: `image/${fileExtension}`,
      } as any);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('tel', phone);
      formData.append('password', password);

      return await api.post('/users', formData);
    },
    onSuccess: () => {
      toast.show({
        description: 'Conta criada com sucesso!',
        placement: 'top',
        bg: 'green.500',
        duration: 3000,
      });
      goBack();
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(signUpSchema),
  });

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

        setUserImage(photoInfo.uri);
      }
    }
  }, []);

  const handleSignUp = useCallback(
    async (data: TFormData) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <VStack flex={1} pb={10}>
        <Center
          bg='gray.600'
          px={10}
          pt={24}
          pb={16}
          borderBottomLeftRadius={40}
          borderBottomRightRadius={40}
        >
          <Logo />
          <Heading fontFamily='heading'>Boas Vindas!</Heading>
          <Text fontFamily='body' textAlign='center'>
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>

          <Box mt={10} position='relative'>
            <Avatar
              source={{ uri: userImage || defaultUserImage }}
              h={20}
              w={20}
              borderWidth={2}
              borderColor='blueLight.900'
            />
            <IconButton
              icon={<PencilSimpleLine size={18} color={colors.gray[700]} />}
              onPress={handlePickImage}
              position='absolute'
              bottom={-10}
              right={-10}
              bg='blueLight.900'
              rounded='full'
            />
          </Box>

          <Text mt={16} mb={4}>
            Acesse sua conta
          </Text>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='phone'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Telefone'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                blurOnSubmit={false}
              />
            )}
          />
          <Controller
            control={control}
            name='confirmPass'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirmar senha'
                secureTextEntry
                returnKeyType='send'
                onSubmitEditing={handleSubmit(handleSignUp)}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirmPass?.message}
              />
            )}
          />

          <Button
            title='Criar'
            bgColor='gray.100'
            isFullWidth
            onPress={handleSubmit(handleSignUp)}
          ></Button>
        </Center>

        <Center mt={16} px={10}>
          <Text fontFamily='body' mb={4}>
            Já tem uma conta?
          </Text>
          <Button
            title='Ir para o login'
            bgColor='gray.500'
            isFullWidth
            onPress={goBack}
          ></Button>
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
