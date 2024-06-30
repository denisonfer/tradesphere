import {
  FormControl,
  IInputProps,
  Input as InputNB,
  Pressable,
} from 'native-base';
import { Eye, EyeSlash } from 'phosphor-react-native';
import React, { useState } from 'react';

type TProps = IInputProps & {
  errorMessage?: string;
};
const Input: React.FC<TProps> = ({
  errorMessage,
  secureTextEntry,
  isInvalid,
  ...rest
}) => {
  const [showPass, setShowPass] = useState(!secureTextEntry);
  const isNotValid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={isNotValid} mb={4}>
      <InputNB
        bg='gray.700'
        h={11}
        px={4}
        borderWidth={0}
        fontSize='md'
        fontFamily='body'
        color='gray.200'
        placeholderTextColor='gray.400'
        type={showPass ? 'text' : 'password'}
        isInvalid={isNotValid}
        InputRightElement={
          secureTextEntry ? (
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
          )
        }
        _focus={{ bg: 'gray.700', borderWidth: 1, borderColor: 'gray.300' }}
        _invalid={{ borderColor: 'red.500', borderWidth: 1 }}
        {...rest}
      />

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};

export default Input;
