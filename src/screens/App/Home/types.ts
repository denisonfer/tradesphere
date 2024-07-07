interface IAdsBase {
  id: string;
  name: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: {
    path: string;
    id: string;
  }[];
  payment_methods: {
    key: string;
    name: string;
  }[];
}

export interface IResponseGetAds extends IAdsBase {
  user: {
    avatar: string;
  };
}
export interface IResponseGetMyAdsList extends IAdsBase {
  description: string;
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
