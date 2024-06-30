import Input from '@components/Input';
import Label from '@components/Label';
import { Radio, Stack, VStack } from 'native-base';
import React from 'react';

const AboutProductSection: React.FC = () => {
  return (
    <VStack mb={8}>
      <Label text='Sobre o produto' />
      <Input placeholder='Título do anúncio' my={4} />
      <Input placeholder='Descrição do produto' multiline h={40} mb={4} />

      <Radio.Group name='isNew' defaultValue='true' accessibilityLabel='Is new'>
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
