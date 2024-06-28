import Button from '@components/Button';
import Input from '@components/Input';
import { Center, Heading, Text, VStack } from 'native-base';
import React from 'react';

import Logo from '@assets/images/logo.svg';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUp: React.FC = () => {
  const { goBack } = useNavigation();
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
          <Input placeholder='Nome' />
          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Input placeholder='Telefone' />
          <Input placeholder='Senha' secureTextEntry />
          <Input placeholder='Confirmar senha' secureTextEntry />
          <Button title='Criar' bgColor='gray.100'></Button>
        </Center>

        <Center mt={16} px={10}>
          <Text fontFamily='body' mb={4}>
            Já tem uma conta?
          </Text>
          <Button
            title='Ir para o login'
            bgColor='gray.500'
            onPress={goBack}
          ></Button>
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
