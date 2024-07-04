import { useNavigation } from '@react-navigation/native';
import { ArrowBackIcon, HStack, Heading, Pressable, View } from 'native-base';
import React from 'react';

type TProps = {
  title?: string;
  buttonRight?: React.JSX.Element;
  hasBackButton?: boolean;
};
const Header: React.FC<TProps> = ({
  hasBackButton = true,
  title,
  buttonRight,
}) => {
  const { goBack } = useNavigation();
  return (
    <HStack
      pt={20}
      pb={5}
      px={6}
      mb={6}
      alignItems='center'
      justifyContent='space-between'
    >
      {hasBackButton && (
        <Pressable onPress={goBack} h={6} w={6}>
          <ArrowBackIcon size={6} color='gray.100' />
        </Pressable>
      )}
      {title && (
        <Heading color='gray.100' fontSize='lg' fontFamily='heading'>
          {title}
        </Heading>
      )}

      {buttonRight ? buttonRight : <View h={6} w={6}></View>}
    </HStack>
  );
};

export default Header;
