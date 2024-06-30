import Button from '@components/Button';
import Input from '@components/Input';
import { Center, Heading, Text, VStack } from 'native-base';
import React, { useCallback } from 'react';

import Logo from '@assets/images/logo.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
    .required('Telefone obrigatório')
    .matches(/^\(\d{2}\) 9\d{4}-\d{4}$/, 'Telefone inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 dígitos'),
  confirmPass: yup
    .string()
    .required('Confirme sua senha')
    .oneOf([yup.ref('password')], 'Senhas diferentes'),
});

const SignUp: React.FC = () => {
  const { goBack } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignUp = useCallback((data: TFormData) => {}, []);

  return (
    <KeyboardAwareScrollView>
      <VStack flex={1}>
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
