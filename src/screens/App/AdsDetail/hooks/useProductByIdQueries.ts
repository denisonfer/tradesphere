import { IResponseGetProductById } from '@shared/interfaces/IProductAds';
import { EQueryKeys } from '@shared/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from 'src/services/api';

const useProductByIdQueries = (adsId: string) => {
  const queryClient = useQueryClient();
  const getProductByIdQuery = useQuery({
    queryKey: [EQueryKeys.ProductById],
    queryFn: async () => {
      return await api.get<IResponseGetProductById>(`/products/${adsId}`);
    },
    enabled: !!adsId,
  });

  const deleteAdsMutation = useMutation({
    mutationFn: async () => {
      return await api.del(`/products/${adsId}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          EQueryKeys.AdsList,
          EQueryKeys.MyAdsList,
          EQueryKeys.ProductById,
        ],
      });
    },
  });

  return {
    getProductByIdQuery,
    deleteAdsMutation,
  };
};

export default useProductByIdQueries;
