import { Control, FieldErrors } from 'react-hook-form';

export enum EPaymentMethods {
  PIX = 'pix',
  CARD = 'card',
  BOLETO = 'boleto',
  CASH = 'cash',
  DEPOSIT = 'deposit',
}
export type TProductImage = {
  id: string;
  uri: string;
};

export type TAdsFormData = {
  name: string;
  description: string;
  price: number;
};

export type TAdsPostData = TAdsFormData & {
  productIsNew: string;
  acceptTrade: boolean;
  paymentSelected: EPaymentMethods[];
};

export type TPropsNestedSection = {
  control: Control<TAdsFormData>;
  errors: FieldErrors<TAdsFormData>;
};
