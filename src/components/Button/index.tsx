import { Button as ButtonNB, IButtonProps, Row, Text } from 'native-base';
import {} from 'phosphor-react-native';
import React from 'react';
type TProps = IButtonProps & {
  title: string;
  isFullWidth?: boolean;
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  bgColor?: 'gray.100' | 'blueLight.900' | 'gray.500';
  variant?: 'solid' | 'outline' | 'ghost';
};
const Button: React.FC<TProps> = ({
  title,
  isFullWidth = false,
  iconLeft,
  iconRight,
  bgColor = 'gray.100',
  variant = 'solid',
  ...rest
}) => {
  return (
    <ButtonNB
      w={isFullWidth ? 'full' : 'auto'}
      h={11}
      bg={
        variant === 'outline' || variant === 'ghost' ? 'transparent' : bgColor
      }
      rounded='sm'
      _pressed={{
        bg:
          variant === 'outline' || variant === 'ghost'
            ? 'gray.500'
            : 'gray.700',
      }}
      {...rest}
      startIcon={iconLeft ? iconLeft : <></>}
      endIcon={iconRight ? iconRight : <></>}
    >
      <Row alignItems='center'>
        <Text
          fontSize='sm'
          fontFamily='heading'
          color={
            bgColor === 'gray.500'
              ? 'gray.100'
              : variant === 'outline' || variant === 'ghost'
              ? 'gray.100'
              : 'gray.700'
          }
          ml={iconLeft ? 2 : 0}
          mr={iconRight ? 2 : 0}
        >
          {title}
        </Text>
      </Row>
    </ButtonNB>
  );
};

export default Button;
