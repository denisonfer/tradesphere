import { useNavigation } from '@react-navigation/native';
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

const useCreateAds = () => {
  const { goBack } = useNavigation();
  const queryClient = useQueryClient();
  const toast = useToast();

  const createAdsMutation = useMutation({
    mutationFn: async (data: TAdsPostData) => {
      const newAdsData = {
        name: data.name,
        description: data.description,
        price: data.price,
        accept_trade: data.acceptTrade,
        payment_methods: data.paymentSelected,
        is_new: data.productIsNew === 'true',
      };
      return await api.post<IResponsePostAds>('/products', newAdsData);
    },
  });

  const uploadImagesOfAdsMutation = useMutation({
    mutationFn: async (data: TImageProductPostData) => {
      const formData = new FormData();
      formData.append('product_id', data.productId);
      data.images.forEach((image) => {
        formData.append('images', image as any);
      });

      return await api.post('/products/images', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.AdsList] });

      toast.show({
        description: 'Anúncio criado com sucesso',
        placement: 'top',
        bg: 'green.500',
        duration: 3000,
      });
      goBack();
    },
  });

  const handleCreateAds = (data: TAdsPostData, images: TProductImage[]) => {
    createAdsMutation.mutate(data, {
      onSuccess: ({ id }) => {
        uploadImagesOfAdsMutation.mutate({
          productId: id,
          images,
        });
      },
    });
  };

  return {
    handleCreateAds,
    isLoading:
      createAdsMutation.isPending || uploadImagesOfAdsMutation.isPending,
  };
};

export default useCreateAds;
