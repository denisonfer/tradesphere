import Input from '@components/Input';
import Label from '@components/Label';
import { Checkbox, Switch, VStack } from 'native-base';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { EPaymentMethods, TPropsNestedSection } from '../types';

type TProps = TPropsNestedSection & {
  acceptTrade: boolean;
  setAcceptTrade: Dispatch<SetStateAction<boolean>>;
  paymentSelected: EPaymentMethods[];
  setPaymentSelected: Dispatch<SetStateAction<EPaymentMethods[]>>;
};

const SaleSection: React.FC<TProps> = ({
  control,
  errors,
  acceptTrade,
  setAcceptTrade,
  paymentSelected,
  setPaymentSelected,
}) => {
  const optionsOfPayment = [
    { label: 'Boleto', value: EPaymentMethods.BOLETO },
    { label: 'Pix', value: EPaymentMethods.PIX },
    { label: 'Dinheiro', value: EPaymentMethods.CASH },
    { label: 'Cartão de crédito', value: EPaymentMethods.CARD },
    { label: 'Deposito bancário', value: EPaymentMethods.DEPOSIT },
  ];

  const handlePaymentSelected = useCallback(
    (value: EPaymentMethods) => {
      console.tron.log('value: ', value);
      console.tron.log(
        'paymentSelected.includes(value): ',
        paymentSelected.includes(value)
      );
      console.tron.log('paymentSelected: ', paymentSelected);
      if (paymentSelected.includes(value)) {
        setPaymentSelected(paymentSelected.filter((item) => item !== value));
      } else {
        setPaymentSelected((oldState) => [...oldState, value]);
      }
    },
    [paymentSelected]
  );

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
      <Switch
        onTrackColor='blueLight.900'
        isChecked={acceptTrade}
        onToggle={setAcceptTrade}
      />

      <Label text='Meios de pagamento aceitos' my={4} />
      {optionsOfPayment.map((payment) => (
        <Checkbox
          key={payment.label}
          borderWidth={0}
          _checked={{
            bg: 'blueLight.900',
          }}
          value={payment.value}
          onChange={() => handlePaymentSelected(payment.value)}
        >
          <Label text={payment.label} />
        </Checkbox>
      ))}
    </VStack>
  );
};

export default SaleSection;
