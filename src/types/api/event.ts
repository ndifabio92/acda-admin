import { GameMode } from './modeGame';
import { Paged } from '../ui/paged';

export type Event = {
  id: number;
  title: string;
  subtitle: string;
  dateGame: Date;
  modeGame: GameMode;
  duration: string;
  location: string;
  locationGps: string;
  registrationOpen: Date;
  registrationClosing: Date;
  maximumQuotas: number;
  openingHours: string;
  price: number;
  partnerPrice: number;
  image: File;
  isActive: boolean;
  isVisible: boolean;
  registered: boolean;
};

export type PagedEvent = Paged<Event>;
