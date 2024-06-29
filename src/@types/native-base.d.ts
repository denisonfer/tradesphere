import 'native-base';

import 'native-base';

declare module 'native-base' {
  interface ICustomTheme {
    colors: {
      blue: {
        900: string;
      };
      blueLight: {
        900: string;
      };
      redLight: {
        900: string;
      };
      gray: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
      };
    };
    fonts: {
      heading: string;
      body: string;
    };
    fontSizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    sizes: {
      11: number;
      14: number;
    };
  }

  interface ITheme extends ICustomTheme {}
}
