import { IResponseGetProductById } from '@shared/interfaces/IProductAds';
import { EQueryKeys } from '@shared/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/services/api';

const useGetProductByIdQuery = (adsId: string) => {
  const getProductByIdQuery = useQuery({
    queryKey: [[EQueryKeys.ProductById]],
    queryFn: async () => {
      return await api.get<IResponseGetProductById>(`/products/${adsId}`);
    },
    enabled: !!adsId,
  });

  return {
    getProductByIdQuery,
  };
};

export default useGetProductByIdQuery;
