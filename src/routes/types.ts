import { NavigatorScreenParams } from '@react-navigation/native';

export type TTabParams = {
  Resume: undefined;
  MyAds: undefined;
  SignOut: undefined;
};

export type TMainStackParams = {
  Home: NavigatorScreenParams<TTabParams>;
  AddAds: { isEditMode?: boolean };
  AdsDetail: {
    AdsId: string;
    isPreviewMode?: boolean;
  };
};

export type TRootStackParams = {
  Login: undefined;
  Main: NavigatorScreenParams<TMainStackParams>;
};
