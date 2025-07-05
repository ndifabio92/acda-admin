import TanStackTable from '../../components/table/Table';
import { getCells } from './cells';
import { Subscription } from '../../types/api/subscription';

export interface Props {
  data: Subscription[];
}

export const SubscriptionTable = ({ data }: Props) => {
  return <TanStackTable columns={getCells()} data={data} />;
};
