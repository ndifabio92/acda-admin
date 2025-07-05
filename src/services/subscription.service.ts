import { parseDateUTC } from '../shared/utils/dateFormater';
import { Subscription, SubscriptionResponse } from '../types/api/subscription';

import api from './base.service';

export const subscriptionService = {
  getFilter: async (query: string, page = 0, size = 10): Promise<SubscriptionResponse> => {
    const response = await api.get<SubscriptionResponse>('/subscription-values/filter', {
      params: {
        query,
        page,
        size,
      },
    });

    return response.data;
  },

  post: async (data: Subscription): Promise<Subscription> => {
    const payload: Subscription = {
      id: data.id,
      value: data.value,
      startDate: parseDateUTC(data.startDate),
    };

    const response = await api.post<Subscription>('/subscription-values', payload);
    return response.data;
  },

  put: async (id: number, data: Subscription): Promise<Subscription> => {
    const payload: Subscription = {
      id: data.id,
      value: data.value,
      startDate: parseDateUTC(data.startDate),
    };
    const response = await api.put<Subscription>(`/subscription-values/${id}`, payload);
    return response.data;
  },

  get: async (): Promise<number> => {
    const response = await api.get<number>('/value');
    return response.data;
  },
};
