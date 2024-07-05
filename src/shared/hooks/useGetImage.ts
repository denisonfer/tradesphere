import { EQueryKeys } from '@shared/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/services/api';

const useGetImage = (filePath: string) => {
  const getImageQuery = useQuery({
    queryKey: [EQueryKeys.AdsImage, filePath],
    queryFn: async () => {
      return await api.get<string>(`/images/${filePath}`);
    },
    enabled: !!filePath,
  });

  return getImageQuery;
};

export default useGetImage;
