/* eslint-disable react-hooks/rules-of-hooks */
import { Event } from '../../types/api/event';
import { Switch, Tooltip } from '@mui/material';
import { DeleteOutline, EditOutlined, ListAltOutlined } from '@mui/icons-material';
import { gameModeTranslations } from '../../shared/constants/translations';
import { ColumnDef } from '@tanstack/react-table';
import { formatDisplayDate, formatDisplayDateTime } from '../../shared/utils/dateFormater';
import { useNavigate } from 'react-router';

export const getEventCells = (
  selectCurrent: (event: Event) => void,
  updateVisibility: (id: number, status: boolean) => void,
  handleOpenModal: (event: Event) => void,
  setOpenDeleteModal: (open: boolean) => void,
  setOpenActiveModal: (open: boolean) => void
): ColumnDef<Event>[] => {
  const navigate = useNavigate();
  return [
    {
      header: 'Título',
      accessorKey: 'title',
    },
    {
      header: 'Fecha del Evento',
      accessorKey: 'dateGame',
      cell: (info) => formatDisplayDate(info.getValue<Date>()),
    },
    {
      header: 'Duración',
      accessorKey: 'duration',
    },
    {
      header: 'Lugar',
      accessorKey: 'location',
    },
    {
      header: 'Apertura Inscripciones',
      accessorKey: 'registrationOpen',
      cell: (info) => formatDisplayDateTime(info.getValue<Date>()),
    },
    {
      header: 'Cierre Inscripciones',
      accessorKey: 'registrationClosing',
      cell: (info) => formatDisplayDateTime(info.getValue<Date>()),
    },
    {
      header: 'Cupos máximos',
      accessorKey: 'maximumQuotas',
    },
    {
      header: 'Horario de Apertura',
      accessorKey: 'openingHours',
      cell: (info) => info.getValue<string>().substring(0, 5),
    },
    {
      header: 'Precio',
      accessorFn: (row) => `$ ${row.price}`,
      id: 'price',
    },
    {
      header: 'Precio Socios',
      accessorFn: (row) => `$ ${row.partnerPrice}`,
      id: 'partnerPrice',
    },
    {
      header: 'Modalidad',
      accessorFn: (row) => gameModeTranslations[row.modeGame],
      id: 'modeGame',
    },
    {
      header: 'Visible',
      accessorKey: 'isVisible',
      cell: (info) => (
        <Switch
          key={info.row.original.id}
          checked={info.getValue<boolean>()}
          disabled={info.row.original.registered}
          onClick={() => updateVisibility(info.row.original.id, info.getValue<boolean>())}
        />
      ),
    },
    {
      header: 'Activo',
      accessorKey: 'isActive',
      cell: (info) => (
        <Switch
          key={info.row.original.id}
          checked={info.getValue<boolean>()}
          onClick={() => {
            selectCurrent(info.row.original);
            setOpenActiveModal(true);
          }}
        />
      ),
    },
    {
      header: 'Acciones',
      cell: (info) => {
        const event = info.row.original;
        return (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Tooltip title="Editar">
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  selectCurrent(event);
                  handleOpenModal(event);
                }}
              >
                <EditOutlined color="primary" />
              </div>
            </Tooltip>
            {!event.registered && (
              <Tooltip title="Eliminar">
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    selectCurrent(event);
                    setOpenDeleteModal(true);
                  }}
                >
                  <DeleteOutline color="error" />
                </div>
              </Tooltip>
            )}
            {event.registered && (
              <Tooltip title="Ver Participantes">
                <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/events/${event.id}`)}>
                  <ListAltOutlined style={{ color: '#58595C' }} />
                </div>
              </Tooltip>
            )}
          </div>
        );
      },
      enableSorting: false,
    },
  ];
};
