import { IInputProps, Input as InputNB, Pressable } from 'native-base';
import { Eye, EyeSlash } from 'phosphor-react-native';
import React, { useState } from 'react';

type TProps = IInputProps & {};
const Input: React.FC<TProps> = ({ secureTextEntry, ...rest }) => {
  const [showPass, setShowPass] = useState(!secureTextEntry);

  return (
    <InputNB
      bg='gray.700'
      h={11}
      px={4}
      borderWidth={0}
      fontSize='md'
      fontFamily='body'
      color='gray.200'
      placeholderTextColor='gray.400'
      mb={4}
      type={showPass ? 'text' : 'password'}
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
      {...rest}
    />
  );
};

export default Input;
