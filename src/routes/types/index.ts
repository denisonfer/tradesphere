import { NavigatorScreenParams } from '@react-navigation/native';

export type TMyAdsStackParams = {
  AddAds: { isEditMode?: boolean };
  AdsDetail: { adsData: string; isPreviewMode?: boolean };
};

export type THomeTabParams = {
  Resume: undefined;
  MyAds: NavigatorScreenParams<TMyAdsStackParams>;
  SignOut: undefined;
};

export type TMainStackParams = {
  Home: NavigatorScreenParams<THomeTabParams>;
  AddAds: { isEditMode?: boolean };
  AdsDetail: { adsData: string; isPreviewMode?: boolean };
};

export type TRootStackParams = {
  Login: undefined;
  Main: NavigatorScreenParams<TMainStackParams>;
};
