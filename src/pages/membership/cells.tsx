import { ColumnDef } from '@tanstack/react-table';
import { formatDisplayDate } from '../../shared/utils/dateFormater';
import { Membership } from '../../types/api/membership';

export const getCells = (): ColumnDef<Membership>[] => {
  return [
    {
      header: 'Valor',
      accessorFn: (row) => `$ ${row.value}`,
      id: 'price',
    },
    {
      header: 'Valido Desde',
      accessorKey: 'startDate',
      cell: (info) => formatDisplayDate(info.getValue<Date>()),
    },
    {
      header: 'Valido Hasta',
      accessorKey: 'endDate',
      cell: (info) => formatDisplayDate(info.getValue<Date>()),
    },
  ];
};
