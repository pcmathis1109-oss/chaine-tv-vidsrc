import { useQuery } from '@tanstack/react-query';
import { iptvApi } from '@/services/iptvApi';
import { Channel } from '@/types';

export const useChannels = () => {
  return useQuery({
    queryKey: ['channels'],
    queryFn: () => iptvApi.getChannels(),
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 3,
  });
};

export const useChannelsByCountry = (countryCode: string) => {
  return useQuery({
    queryKey: ['channels', countryCode],
    queryFn: () => iptvApi.getChannelsByCountry(countryCode),
    enabled: !!countryCode,
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });
};

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: () => iptvApi.getCountries(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 3,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => iptvApi.getCategories(),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 3,
  });
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: () => iptvApi.getLanguages(),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 3,
  });
};