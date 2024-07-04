import { RootStackParams } from '@routes/types/TAllRoutesParams';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}
