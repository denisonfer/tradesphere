import Input from '@components/Input';
import Label from '@components/Label';
import { Checkbox, Switch, VStack } from 'native-base';
import React, { Dispatch, SetStateAction } from 'react';
import { Controller } from 'react-hook-form';
import { EPaymentMethods, TPropsNestedSection } from '../types';

type TProps = TPropsNestedSection & {
  acceptTrade: boolean;
  setAcceptTrade: Dispatch<SetStateAction<boolean>>;
  paymentSelected: EPaymentMethods[];
  handlePaymentSelector: (value: EPaymentMethods) => void;
};

const SaleSection: React.FC<TProps> = ({
  control,
  errors,
  acceptTrade,
  setAcceptTrade,
  paymentSelected,
  handlePaymentSelector,
}) => {
  const optionsOfPayment = [
    { label: 'Boleto', value: EPaymentMethods.BOLETO },
    { label: 'Pix', value: EPaymentMethods.PIX },
    { label: 'Dinheiro', value: EPaymentMethods.CASH },
    { label: 'Cartão de crédito', value: EPaymentMethods.CARD },
    { label: 'Deposito bancário', value: EPaymentMethods.DEPOSIT },
  ];

  return (
    <VStack>
      <Label text='Venda' />
      <Controller
        name='price'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Valor do produto'
            onChangeText={onChange}
            value={value}
            InputLeftElement={<Label text='R$' />}
            keyboardType='numeric'
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
          isChecked={paymentSelected.includes(payment.value)}
          onChange={() => handlePaymentSelector(payment.value)}
        >
          <Label text={payment.label} />
        </Checkbox>
      ))}
    </VStack>
  );
};

export default SaleSection;
