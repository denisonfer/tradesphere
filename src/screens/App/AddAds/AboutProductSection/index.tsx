import Input from '@components/Input';
import Label from '@components/Label';
import { Radio, Stack, VStack } from 'native-base';
import React, { Dispatch, SetStateAction } from 'react';
import { Controller } from 'react-hook-form';
import { TPropsNestedSection } from '../types';

type TProps = TPropsNestedSection & {
  productIsNew: string;
  setProductIsNew: Dispatch<SetStateAction<string>>;
};

const AboutProductSection: React.FC<TProps> = ({
  control,
  errors,
  productIsNew,
  setProductIsNew,
}) => {
  return (
    <VStack mb={8}>
      <Label text='Sobre o produto' />
      <Controller
        control={control}
        name='name'
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Título do anúncio'
            onChangeText={onChange}
            value={value}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name='description'
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Descrição do produto'
            multiline
            h={40}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
          />
        )}
      />

      <Radio.Group
        name='isNew'
        defaultValue='true'
        value={productIsNew}
        accessibilityLabel='Is new'
        onChange={(value) => setProductIsNew(value)}
      >
        <Stack direction='row' space={5}>
          <Radio value='true' colorScheme='blue'>
            Produto novo
          </Radio>
          <Radio value='false' colorScheme='blue'>
            Produto usado
          </Radio>
        </Stack>
      </Radio.Group>
    </VStack>
  );
};

export default AboutProductSection;
