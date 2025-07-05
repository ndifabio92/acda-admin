import { useState } from 'react';
import { Event } from '../../types/api/event';
import { getEventCells } from './cells';
import { eventService } from '../../services/event.service';
import TanStackTable from '../../components/table/Table';
import { ConfirmationModal } from '../../components/modal/ConfirmationModal';

export interface Props {
  data: Event[];
  refreshEvents: () => Promise<void>;
  currentEvent: Event | null;
  setCurrentEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  handleOpenModal: (event: Event) => void;
}

export const EventsTable = ({
  data,
  refreshEvents,
  currentEvent,
  setCurrentEvent,
  handleOpenModal,
}: Props) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openActiveModal, setOpenActiveModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteEvent = async () => {
    if (!currentEvent) return;
    try {
      setLoading(true);
      await eventService.deleteEvent(currentEvent.id);
      await refreshEvents();
    } finally {
      setOpenDeleteModal(false);
      setLoading(false);
    }
  };

  const updateVisibility = async (id: number, status: boolean) => {
    try {
      setLoading(true);
      await eventService.updateVisibility(id, !status);
      await refreshEvents();
    } finally {
      setLoading(false);
    }
  };

  const updateActive = async () => {
    if (!currentEvent) return;
    const { id, isActive } = currentEvent;
    try {
      setLoading(true);
      await eventService.updateActive(id, !isActive);
      await refreshEvents();
    } finally {
      setLoading(false);
      setOpenActiveModal(false);
    }
  };

  return (
    <>
      <TanStackTable
        columns={getEventCells(
          setCurrentEvent,
          updateVisibility,
          handleOpenModal,
          setOpenDeleteModal,
          setOpenActiveModal
        )}
        data={data}
      />
      <ConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="Eliminar Evento"
        description={`¿Estás seguro de que deseas eliminar el evento "${currentEvent?.title}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        onConfirm={deleteEvent}
        loading={loading}
      />

      <ConfirmationModal
        open={openActiveModal}
        onClose={() => setOpenActiveModal(false)}
        title="Dar de baja Evento"
        description={`¿Estás seguro de que deseas dar de baja el evento "${currentEvent?.title}"? Esta acción generará un envio de notificaciones (Email, whatsapp) a todos los participantes inscriptos.`}
        confirmText="Dar de Baja"
        onConfirm={updateActive}
        loading={loading}
      />
    </>
  );
};
