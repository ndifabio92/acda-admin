import { Membership } from '../../types/api/membership';
import TanStackTable from '../../components/table/Table';
import { getCells } from './cells';

export interface Props {
  data: Membership[];
}

export const MembershipTable = ({ data }: Props) => {
  return <TanStackTable columns={getCells()} data={data} />;
};
