import {
  FormControl,
  IInputProps,
  Input as InputNB,
  Pressable,
} from 'native-base';
import { Eye, EyeSlash } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  TextInputMask,
  TextInputMaskOptionProp,
} from 'react-native-masked-text';

type TProps = IInputProps & {
  formatType?: 'phone' | 'money' | 'custom';
  errorMessage?: string;
};
const Input: React.FC<TProps> = ({
  formatType = 'custom',
  errorMessage,
  secureTextEntry,
  value,
  onChangeText,
  isInvalid,
  ...rest
}) => {
  const [showPass, setShowPass] = useState(!secureTextEntry);
  const isNotValid = !!errorMessage || isInvalid;

  let maskOptions: TextInputMaskOptionProp = {};

  switch (formatType) {
    case 'money':
      maskOptions = {
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: 'R$',
        suffixUnit: '',
      };
      break;

    default:
      maskOptions = {
        maskType: 'BRL',
        withDDD: true,
        dddMask: '(99) ',
      };
  }

  const customTextInputProps = {
    bg: 'gray.700',
    h: 11,
    px: 4,
    borderWidth: 0,
    fontSize: 'md',
    fontFamily: 'body',
    color: 'gray.200',
    placeholderTextColor: 'gray.400',
    isInvalid: isNotValid,
    InputRightElement: secureTextEntry ? (
      <>
        {showPass ? (
          <Pressable onPress={() => setShowPass(!showPass)} mr={4}>
            <EyeSlash size={24} />
          </Pressable>
        ) : (
          <Pressable onPress={() => setShowPass(!showPass)} mr={4}>
            <Eye size={24} />
          </Pressable>
        )}
      </>
    ) : (
      <></>
    ),
    _focus: { bg: 'gray.700', borderWidth: 1, borderColor: 'gray.300' },
    _invalid: { borderColor: 'red.500', borderWidth: 1 },
    ...rest,
  };
  return (
    <FormControl isInvalid={isNotValid} mb={4}>
      {formatType === 'custom' ? (
        <InputNB
          type={showPass ? 'text' : 'password'}
          {...customTextInputProps}
          {...rest}
        />
      ) : (
        <TextInputMask
          type={formatType === 'money' ? 'money' : 'cel-phone'}
          options={maskOptions}
          value={value}
          onChangeText={onChangeText}
          customTextInput={InputNB}
          customTextInputProps={customTextInputProps}
          {...rest}
        />
      )}

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};

export default Input;
