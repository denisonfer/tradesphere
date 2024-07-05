import React from 'react';

import { FormControl, useTheme } from 'native-base';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

type TProps = TextInputMaskProps & {
  errorMessage?: string;
};
const InputMoney: React.FC<TProps> = ({
  errorMessage,
  onChangeText,
  value,
  ...rest
}) => {
  const { colors, fonts } = useTheme();
  return (
    <FormControl>
      <TextInputMask
        type='money'
        onChangeText={onChangeText}
        keyboardType='numeric'
        placeholderTextColor={colors.gray[400]}
        value={value}
        includeRawValueInChangeText
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: '',
          suffixUnit: '',
        }}
        style={{
          backgroundColor: colors.gray[700],
          height: 42,
          borderRadius: 4,
          paddingHorizontal: 16,
          fontSize: 16,
          fontFamily: fonts.body,
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};

export default InputMoney;
