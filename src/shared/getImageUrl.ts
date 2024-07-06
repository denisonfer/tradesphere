import { defaultNoImage } from '@utils/index';
import { BASE_API_URL } from 'src/envs';

const getImageUrl = (filePath: string | undefined): string => {
  if (!filePath) return defaultNoImage;
  const imageUrl = `${BASE_API_URL}/images/${filePath}`;

  return imageUrl;
};

export default getImageUrl;
