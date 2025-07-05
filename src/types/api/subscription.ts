import { Paged } from '../ui/paged';

export type Subscription = {
  id: number;
  value: number;
  startDate: Date;
  endDate?: Date;
};

export type PagedSubscription = Paged<Subscription>;

export type SubscriptionResponse = {
  historicSubscriptionValues: PagedSubscription;
  value: Subscription;
};
