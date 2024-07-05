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
  const [showPass, setShowPass] = useState(false);
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
        isInvalid={isNotValid}
        secureTextEntry={secureTextEntry && !showPass}
        InputRightElement={
          secureTextEntry ? (
            <Pressable onPress={() => setShowPass(!showPass)} mr={4}>
              {showPass ? <EyeSlash size={24} /> : <Eye size={24} />}
            </Pressable>
          ) : undefined
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
