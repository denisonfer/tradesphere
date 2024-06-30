import { ITextProps, Text } from 'native-base';
import React from 'react';

type TProps = ITextProps & {
  text: string;
  size?: number;
};
const Label: React.FC<TProps> = ({ text, size, ...rest }) => {
  return (
    <Text
      fontFamily='heading'
      fontSize={size ? size : 'md'}
      color='gray.200'
      {...rest}
    >
      {text}
    </Text>
  );
};

export default Label;
