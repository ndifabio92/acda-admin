import { ColumnDef } from '@tanstack/react-table';
import { CustomerEvent } from '../../types/api/eventParticipants';

export const getCells = (): ColumnDef<CustomerEvent>[] => {
  return [
    {
      header: 'Nombre',
      accessorKey: 'name',
    },
    {
      header: 'DNI',
      accessorKey: 'dni',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Telefono',
      accessorKey: 'phoneNumber',
    },
    {
      header: 'Alt. Telefono',
      accessorKey: 'altPhoneNumber',
    },
    {
      header: 'Team',
      accessorKey: 'team',
    },
    {
      header: 'Socio',
      accessorFn: (row) => (row.isPartner ? 'Socio' : 'Particular'),
      id: 'isPartner',
    },
  ];
};
