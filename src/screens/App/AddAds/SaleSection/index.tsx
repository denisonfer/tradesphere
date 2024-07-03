import Input from '@components/Input';
import Label from '@components/Label';
import { Checkbox, Switch, VStack } from 'native-base';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TPropsNestedSection } from '../types';

type TProps = TPropsNestedSection & {};

const SaleSection: React.FC<TProps> = ({ control, errors }) => {
  return (
    <VStack>
      <Label text='Venda' />
      <Controller
        name='price'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Valor do produto'
            keyboardType='numeric'
            onChangeText={onChange}
            value={value}
            InputLeftElement={<Label text='R$' ml={4} />}
            errorMessage={errors.price?.message}
          />
        )}
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
