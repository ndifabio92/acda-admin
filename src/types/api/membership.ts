import { Paged } from '../ui/paged';

export type Membership = {
  id: number;
  value: number;
  startDate: Date;
  endDate?: Date;
};

export type PagedMembership = Paged<Membership>;

export type MembershipResponse = {
  historicMemberShipValues: PagedMembership;
  value: Membership;
};
