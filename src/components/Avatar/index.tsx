import {
  Heading,
  IAvatarProps,
  Avatar as NativeBaseAvatar,
  Text,
  VStack,
} from 'native-base';
import React from 'react';

type TProps = IAvatarProps & {
  avatarUrl: string;
  nameUser?: string;
  hasWelcome?: boolean;
  nameIsVisible?: boolean;
  renderInProductItem?: boolean;
};
const Avatar: React.FC<TProps> = ({
  avatarUrl,
  hasWelcome = false,
  nameIsVisible = false,
  renderInProductItem = false,
  nameUser,
  ...rest
}) => {
  return (
    <>
      <NativeBaseAvatar
        borderWidth={2}
        borderColor={renderInProductItem ? 'gray.700' : 'blueLight.900'}
        bg='gray.400'
        source={{
          uri: avatarUrl,
        }}
        {...rest}
      />

      {hasWelcome && (
        <VStack flex={1} ml={4}>
          <Text fontFamily='body' flex={1}>
            Boas Vindas,
          </Text>

          <Heading fontFamily='heading'>{nameUser}</Heading>
        </VStack>
      )}
    </>
  );
};

export default Avatar;
