import { defaultNoImage } from '@utils/index';
import { BASE_API_URL } from 'src/envs';

const useGetImage = (filePath: string) => {
  if (!filePath) return defaultNoImage;
  const imageUrl = `${BASE_API_URL}/images/${filePath}`;

  return imageUrl;
};

export default useGetImage;
