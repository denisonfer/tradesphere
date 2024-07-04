import { RootStackParams } from '@routes/index';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}
