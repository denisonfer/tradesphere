import { NavigatorScreenParams } from '@react-navigation/native';
import { THomeStackParams } from './THomeStackParams';
import { TMyAdsStackParams } from './TMyAdsStackParams';

export type TAllRoutesParams = {
  Home: NavigatorScreenParams<THomeStackParams>;
  MyAds: NavigatorScreenParams<TMyAdsStackParams>;
  SignOut: undefined;
} & THomeStackParams &
  TMyAdsStackParams;
