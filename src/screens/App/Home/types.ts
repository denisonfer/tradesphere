export interface IResponseGetAds {
  id: string;
  name: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: any[];
  payment_methods: {
    key: string;
    name: string;
  }[];
  user: {
    avatar: string;
  };
}
