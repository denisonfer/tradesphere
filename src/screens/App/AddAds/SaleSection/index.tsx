import Input from '@components/Input';
import Label from '@components/Label';
import { Checkbox, Switch, VStack } from 'native-base';
import React from 'react';

const SaleSection: React.FC = () => {
  return (
    <VStack>
      <Label text='Venda' />
      <Input
        placeholder='Valor do produto'
        my={4}
        InputLeftElement={<Label text='R$' ml={4} />}
        keyboardType='numeric'
      />
      <Label text='Aceita troca?' mb={4} />
      <Switch onTrackColor='blueLight.900' />

      <Label text='Meios de pagamento aceitos' my={4} />
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
    </VStack>
  );
};

export default SaleSection;
