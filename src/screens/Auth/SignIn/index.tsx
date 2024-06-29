import Button from '@components/Button';
import Input from '@components/Input';
import { Center, Heading, ScrollView, Text, VStack } from 'native-base';
import React from 'react';

import Logo from '@assets/images/logo.svg';
import { useNavigation } from '@react-navigation/native';
import { TAuthNavigatorRoutesProps } from '@routes/auth.route';

const SignIn: React.FC = () => {
  const { navigate } = useNavigation<TAuthNavigatorRoutesProps>();
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
          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Input placeholder='Senha' secureTextEntry />
          <Button title='Entrar' bgColor='blueLight.900' isFullWidth></Button>
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
