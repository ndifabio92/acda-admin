import { parseDateUTC } from '../shared/utils/dateFormater';
import { Membership, MembershipResponse } from '../types/api/membership';
import api from './base.service';

export const membershipService = {
  getFilter: async (query: string, page = 0, size = 10): Promise<MembershipResponse> => {
    const response = await api.get<MembershipResponse>('/membership-values/filter', {
      params: {
        query,
        page,
        size,
      },
    });

    return response.data;
  },

  post: async (data: Membership): Promise<Membership> => {
    const payload: Membership = {
      id: data.id,
      value: data.value,
      startDate: parseDateUTC(data.startDate),
    };

    const response = await api.post<Membership>('/membership-values', payload);
    return response.data;
  },

  put: async (id: number, data: Membership): Promise<Membership> => {
    const payload: Membership = {
      id: data.id,
      value: data.value,
      startDate: parseDateUTC(data.startDate),
    };
    console.log(payload, id);
    const response = await api.put<Membership>(`/membership-values/${id}`, payload);
    return response.data;
  },

  get: async (): Promise<number> => {
    const response = await api.get<number>('/value');
    return response.data;
  },
};
