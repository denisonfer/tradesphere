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
  name: string;
  type: string;
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

export type TImageProductPostData = {
  productId: string;
  images: TProductImage[];
};

export interface IResponsePostAds {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type TPropsNestedSection = {
  control: Control<TAdsFormData>;
  errors: FieldErrors<TAdsFormData>;
};
