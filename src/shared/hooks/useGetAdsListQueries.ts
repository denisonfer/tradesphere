import {
  IResponseGetAds,
  IResponseGetMyAdsList,
} from '@shared/interfaces/IProductAds';
import { EQueryKeys } from '@shared/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/services/api';
import { useAuthStore } from 'src/stores/useAuthStore';

const useGetAdsListQueries = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const getMyAdsListQuery = useQuery({
    queryKey: [EQueryKeys.MyAdsList],
    queryFn: async () => {
      return await api.get<IResponseGetMyAdsList[]>('/users/products');
    },

    enabled: !!currentUser,
  });
  const getAdsListQuery = useQuery({
    queryKey: [EQueryKeys.AdsList],
    queryFn: async () => {
      return await api.get<IResponseGetAds[]>('/products');
    },
  });

  return {
    getAdsListQuery,
    getMyAdsListQuery,
  };
};

export default useGetAdsListQueries;
