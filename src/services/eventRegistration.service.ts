import { EventRegistration } from '../types/api/eventParticipants';
import api from './base.service';

export const eventRegistrationService = {
  getEventParticipants: async (id: number): Promise<EventRegistration[]> => {
    const response = await api.get<EventRegistration[]>(`/events-registration/participants/${id}`);
    return response.data;
  },
};
