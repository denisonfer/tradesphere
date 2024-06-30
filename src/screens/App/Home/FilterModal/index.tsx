import CustomButton from '@components/Button';
import {
  Button,
  Checkbox,
  HStack,
  Pressable,
  Switch,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import { X } from 'phosphor-react-native';
import React, { RefObject } from 'react';
import { Modalize } from 'react-native-modalize';

type TProps = {
  modalRef: RefObject<Modalize>;
};
const FilterModal: React.FC<TProps> = ({ modalRef }) => {
  const { colors } = useTheme();
  return (
    <VStack
      flex={1}
      bg='gray.600'
      p={6}
      roundedTopLeft={24}
      roundedTopRight={24}
    >
      <HStack justifyContent='space-between'>
        <Text fontFamily='heading'>Filtrar anúncios</Text>
        <Pressable onPress={() => modalRef.current?.close()}>
          <X size={24} color={colors.gray[400]} />
        </Pressable>
      </HStack>

      <Text fontFamily='heading' mt={6} mb={3}>
        Condição
      </Text>
      <HStack>
        <Button
          bg='blueLight.900'
          px={4}
          py={2}
          mr='2'
          rounded='full'
          _pressed={{ bg: 'gray.400' }}
        >
          <Text fontFamily='heading' fontSize='xs' color='gray.700'>
            Novo
          </Text>
        </Button>
        <Button
          bg='gray.500'
          px={4}
          py={2}
          rounded='full'
          _pressed={{ bg: 'gray.400' }}
        >
          <Text fontFamily='heading' fontSize='xs' color='gray.100'>
            Usado
          </Text>
        </Button>
      </HStack>

      <Text fontFamily='heading' mb={3} mt={6}>
        Aceita Troca?
      </Text>
      <Switch mb={6} />
      <Text mb={2} fontFamily='heading'>
        Meios de pagamento aceitos
      </Text>

      <Checkbox.Group mb={16}>
        <Checkbox
          borderWidth={0}
          _checked={{
            bg: 'blueLight.900',
          }}
          value='boleto'
        >
          Boleto
        </Checkbox>
        <Checkbox
          borderWidth={0}
          _checked={{
            bg: 'blueLight.900',
          }}
          value='pix'
        >
          Pix
        </Checkbox>
        <Checkbox
          borderWidth={0}
          _checked={{
            bg: 'blueLight.900',
          }}
          value='dinheiro'
        >
          Dinheiro
        </Checkbox>
        <Checkbox
          borderWidth={0}
          _checked={{
            bg: 'blueLight.900',
          }}
          value='cartão de crédito'
        >
          Cartão de Crédito
        </Checkbox>
        <Checkbox
          borderWidth={0}
          _checked={{
            bg: 'blueLight.900',
          }}
          value='depósito bancário'
        >
          Depósito Bancário
        </Checkbox>
      </Checkbox.Group>

      <HStack justifyContent='space-between'>
        <CustomButton title='Resetar filtros' bgColor='gray.500' w='48%' />
        <CustomButton title='Aplicar filtros' w='48%' />
      </HStack>
    </VStack>
  );
};

export default FilterModal;
