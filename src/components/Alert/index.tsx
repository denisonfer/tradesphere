import { AlertDialog, Button, Center, Spinner } from 'native-base';
import React, { useRef } from 'react';

type TProps = {
  isVisible: boolean;
  title: string;
  message: string;
  textButtonOk: string;
  isLoading?: boolean;
  onPressOK: () => void;
  onPressCancel: () => void;
};
const Alert: React.FC<TProps> = ({
  isVisible,
  title = 'Atenção',
  message = 'Esta ação não pode ser desfeita.',
  textButtonOk = 'OK',
  isLoading = false,
  onPressOK,
  onPressCancel,
}) => {
  const cancelRef = useRef(null);

  return (
    <Center flex={1} px='3'>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isVisible}
        onClose={onPressCancel}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{title}</AlertDialog.Header>
          <AlertDialog.Body>{message}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant='unstyled'
                colorScheme='coolGray'
                onPress={onPressCancel}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onPress={onPressOK}
                leftIcon={
                  isLoading ? <Spinner color='gray.700' size='sm' /> : undefined
                }
              >
                {textButtonOk}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default Alert;
