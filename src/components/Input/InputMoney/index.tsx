import React from 'react';

import Label from '@components/Label';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';
import Input from '..';

const InputMoney: React.FC<TextInputMaskProps> = ({ ...rest }) => {
  return (
    <TextInputMask
      includeRawValueInChangeText
      customTextInput={Input}
      customTextInputProps={{
        InputLeftElement: <Label text='R$' ml={4} />,
      }}
      {...rest}
    />
  );
};

export default InputMoney;
