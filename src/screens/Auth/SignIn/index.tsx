import Button from '@components/Button';
import Input from '@components/Input';
import { Center, Heading, ScrollView, Text, VStack } from 'native-base';
import React, { useCallback } from 'react';

import Logo from '@assets/images/logo.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { TAuthNavigatorRoutesProps } from '@routes/auth.route';

import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type TFormData = {
  email: string;
  password: string;
};

const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
});

const SignIn: React.FC = () => {
  const { navigate } = useNavigation<TAuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = useCallback((data: TFormData) => {
    console.log(data);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
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
          <Heading fontFamily='heading'>TradeSphere</Heading>
          <Text fontFamily='body'>Seu espaço de compra e venda</Text>

          <Text mt={16} mb={4}>
            Acesse sua conta
          </Text>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                errorMessage={errors.email?.message}
                onChangeText={onChange}
                value={value}
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
                errorMessage={errors.password?.message}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignIn)}
                returnKeyType='send'
              />
            )}
          />

          <Button
            title='Entrar'
            bgColor='blueLight.900'
            isFullWidth
            onPress={handleSubmit(handleSignIn)}
          ></Button>
        </Center>

        <Center mt={14} px={10} pt={24}>
          <Text fontFamily='body' mb={4}>
            Ainda não tem acesso?
          </Text>
          <Button
            title='Criar uma conta'
            bgColor='gray.500'
            isFullWidth
            onPress={() => navigate('SignUp')}
          ></Button>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default SignIn;
