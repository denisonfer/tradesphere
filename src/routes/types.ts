import { NavigatorScreenParams } from '@react-navigation/native';
import { IResponseGetAds } from '@screens/App/Home/types';

export type TTabParams = {
  Resume: undefined;
  MyAds: undefined;
  SignOut: undefined;
};

export type TMainStackParams = {
  Home: NavigatorScreenParams<TTabParams>;
  AddAds: { isEditMode?: boolean };
  AdsDetail: { adsData: IResponseGetAds; isPreviewMode?: boolean };
};

export type TRootStackParams = {
  Login: undefined;
  Main: NavigatorScreenParams<TMainStackParams>;
};
