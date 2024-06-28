import { Button as ButtonNB, IButtonProps, Row, Text } from 'native-base';
import {} from 'phosphor-react-native';
import React from 'react';
type TProps = IButtonProps & {
  title: string;
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  bgColor?: 'gray.100' | 'blueLight.900' | 'gray.500';
  variant?: 'solid' | 'outline';
};
const Button: React.FC<TProps> = ({
  title,
  iconLeft,
  iconRight,
  bgColor = 'gray.100',
  variant = 'solid',
  ...rest
}) => {
  return (
    <ButtonNB
      w='full'
      h={11}
      bg={variant === 'outline' ? 'transparent' : bgColor}
      rounded='sm'
      _pressed={{ bg: variant === 'outline' ? 'gray.500' : 'gray.700' }}
      {...rest}
    >
      <Row alignItems='center'>
        {iconLeft && iconLeft}
        <Text
          fontSize='sm'
          fontFamily='heading'
          color={
            bgColor === 'gray.500'
              ? 'gray.100'
              : variant === 'outline'
              ? 'gray.100'
              : 'gray.700'
          }
          ml={iconLeft ? 2 : 0}
          mr={iconRight ? 2 : 0}
        >
          {title}
        </Text>
        {iconRight && iconRight}
      </Row>
    </ButtonNB>
  );
};

export default Button;
