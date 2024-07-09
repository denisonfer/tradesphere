import { NavigatorScreenParams } from '@react-navigation/native';
import { IResponseGetProductById } from '@shared/interfaces/IProductAds';

export type TTabParams = {
  Resume: undefined;
  MyAds: undefined;
  SignOut: undefined;
};

export type TMainStackParams = {
  Home: NavigatorScreenParams<TTabParams>;
  AddAds: { isEditMode?: boolean; adsData?: IResponseGetProductById };
  AdsDetail: {
    AdsId: string;
    isPreviewMode?: boolean;
  };
};

export type TRootStackParams = {
  Login: undefined;
  Main: NavigatorScreenParams<TMainStackParams>;
};
