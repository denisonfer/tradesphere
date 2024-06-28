import { Center, Spinner } from 'native-base';

export default function Loading() {
  return (
    <Center flex={1}>
      <Spinner color='blue.900' />
    </Center>
  );
}
