import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TTabParams } from '@routes/types';
import { EQueryKeys } from '@shared/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'native-base';
import {
  IResponsePostAds,
  TAdsPostData,
  TImageProductPostData,
  TProductImage,
} from 'src/screens/App/AddAds/types';
import { api } from 'src/services/api';

type TNavigationParams = NavigationProp<TTabParams>;
const useCreateAds = () => {
  const { navigate } = useNavigation<TNavigationParams>();
  const queryClient = useQueryClient();
  const toast = useToast();

  const buildRequestBody = (data: TAdsPostData) => {
    const newAdsData = {
      name: data.name,
      description: data.description,
      price: data.price,
      accept_trade: data.acceptTrade,
      payment_methods: data.paymentSelected,
      is_new: data.productIsNew === 'true',
    };

    return newAdsData;
  };

  const createAdsMutation = useMutation({
    mutationFn: async (data: TAdsPostData) => {
      const newAdsData = buildRequestBody(data);
      return await api.post<IResponsePostAds>('/products', newAdsData);
    },
  });

  const updateAdsMutation = useMutation({
    mutationFn: async (data: TAdsPostData & { adsId: string }) => {
      const newAdsData = buildRequestBody(data);
      return await api.put<IResponsePostAds>(
        `/products/${data.adsId}`,
        newAdsData
      );
    },
  });

  const uploadImagesOfAdsMutation = useMutation({
    mutationFn: async (data: TImageProductPostData) => {
      const formData = new FormData();
      formData.append('product_id', data.productId);
      data.images.forEach((image) => {
        if (image.uri.includes('file://')) {
          formData.append('images', image as any);
        }
      });

      return await api.post('/products/images', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.AdsList, EQueryKeys.MyAdsList],
      });

      navigate('MyAds');
    },
  });

  const handleCreateAds = (data: TAdsPostData, images: TProductImage[]) => {
    createAdsMutation.mutate(data, {
      onSuccess: ({ id }) => {
        toast.show({
          description: 'Anúncio criado com sucesso',
          placement: 'top',
          bg: 'green.500',
          duration: 3000,
        });

        uploadImagesOfAdsMutation.mutate({
          productId: id,
          images,
        });
      },
    });
  };

  const handleUpdateAds = (
    data: TAdsPostData & { adsId: string },
    images: TProductImage[]
  ) => {
    updateAdsMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [EQueryKeys.ProductById, data.adsId],
        });
        toast.show({
          description: 'Anúncio Editado com sucesso',
          placement: 'top',
          bg: 'green.500',
          duration: 3000,
        });
        uploadImagesOfAdsMutation.mutate({
          productId: data.adsId,
          images,
        });
      },
    });
  };

  return {
    handleCreateAds,
    handleUpdateAds,
    isLoading:
      createAdsMutation.isPending || uploadImagesOfAdsMutation.isPending,
  };
};

export default useCreateAds;
