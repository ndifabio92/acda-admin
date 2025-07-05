import api from './base.service';
import { Event, PagedEvent } from '../types/api/event';
import { parseDateUTC } from '../shared/utils/dateFormater';

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get<Event[]>('/events/list');
    return response.data;
  },

  getEventById: async (id: number): Promise<Event> => {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  },

  getEventsFiltered: async (
    query: string,
    modeGame?: string,
    page = 0,
    size = 10
  ): Promise<PagedEvent> => {
    const response = await api.get<PagedEvent>('/events/filter', {
      params: {
        query,
        modeGame: modeGame === 'ALL' ? null : modeGame,
        page,
        size,
      },
    });
    return response.data;
  },

  createEvent: async (eventData: Event): Promise<Event> => {
    const formData = new FormData();

    const eventDTO = {
      title: eventData.title,
      subtitle: eventData.subtitle,
      dateGame: parseDateUTC(eventData.dateGame),
      modeGame: eventData.modeGame,
      duration: eventData.duration,
      location: eventData.location,
      locationGps: eventData.locationGps,
      registrationOpen: parseDateUTC(eventData.registrationOpen),
      registrationClosing: parseDateUTC(eventData.registrationClosing),
      maximumQuotas: eventData.maximumQuotas,
      openingHours: eventData.openingHours,
      price: eventData.price,
      partnerPrice: eventData.partnerPrice,
      isActive: true,
      isVisible: false,
    };

    formData.append('eventDTO', new Blob([JSON.stringify(eventDTO)], { type: 'application/json' }));

    if (eventData.image instanceof File) {
      formData.append('image', eventData.image);
    }

    const response = await api.post<Event>('/events', formData);
    return response.data;
  },

  updateEvent: async (id: number, eventData: Event): Promise<Event> => {
    const formData = new FormData();

    const eventDTO = {
      id: eventData.id,
      title: eventData.title,
      subtitle: eventData.subtitle,
      dateGame: parseDateUTC(eventData.dateGame),
      modeGame: eventData.modeGame,
      duration: eventData.duration,
      location: eventData.location,
      locationGps: eventData.locationGps,
      registrationOpen: parseDateUTC(eventData.registrationOpen),
      registrationClosing: parseDateUTC(eventData.registrationClosing),
      maximumQuotas: eventData.maximumQuotas,
      openingHours: eventData.openingHours.substring(0, 5),
      price: eventData.price,
      partnerPrice: eventData.partnerPrice,
      isActive: eventData.isActive,
      isVisible: eventData.isVisible,
    };

    formData.append('eventDTO', new Blob([JSON.stringify(eventDTO)], { type: 'application/json' }));

    if (eventData.image instanceof File) {
      formData.append('image', eventData.image);
    }

    const response = await api.put<Event>(`/events/${id}`, formData);
    return response.data;
  },

  deleteEvent: async (id: number): Promise<boolean> => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  updateVisibility: async (id: number, isActive: boolean): Promise<Event> => {
    const response = await api.put<Event>(`/events/${id}/visible/${isActive}`);
    return response.data;
  },

  updateActive: async (id: number, isActive: boolean): Promise<Event> => {
    const response = await api.put<Event>(`/events/${id}/active/${isActive}`);
    return response.data;
  },
};
