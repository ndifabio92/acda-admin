/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Button, Select, MenuItem } from '@mui/material';
import { eventService } from '../../services/event.service';
import { Event, PagedEvent } from '../../types/api/event';
import Title from '../../components/title/Title';
import Modal from '../../components/modal/Modal';
import { gameModeTranslations } from '../../shared/constants/translations';
import { SearchField } from '../../components/inputs/search/SearchField';
import TablePagination from '../../components/table/TablePaginate';
import styles from './events.module.css';
import { EventsTable } from './EventsTable';
import { EventsForm } from './EventsForm';

const Events = () => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState('ALL');
  const [events, setEvents] = useState<PagedEvent>({} as PagedEvent);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    size: 5,
  });

  const fetchEvents = async (
    currentPage: number = pagination.page,
    currentSize: number = pagination.size
  ) => {
    const data = await eventService.getEventsFiltered(
      search,
      modeFilter,
      currentPage - 1,
      currentSize
    );
    setEvents(data);
    setPagination({ page: currentPage, size: currentSize });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearch(searchInput);
    }
  };

  const handleOpenModal = (event?: Event) => {
    setCurrentEvent(event || null);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentEvent(null);
    setOpen(false);
  };

  const onSubmit = async (data: Event) => {
    if (currentEvent) {
      await eventService.updateEvent(currentEvent.id, data);
    } else {
      await eventService.createEvent(data);
    }
    await fetchEvents();
    handleCloseModal();
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination({ page: 1, size: newPageSize });
  };

  useEffect(() => {
    fetchEvents(pagination.page, pagination.size);
  }, [pagination.page, pagination.size, search, modeFilter]);

  return (
    <>
      <Title text="Eventos" />
      <div className={styles['div-search']}>
        <SearchField value={searchInput} onChange={setSearchInput} onKeyDown={handleKeyPress} />

        <Select
          size="small"
          value={modeFilter}
          onChange={(e) => setModeFilter(e.target.value)}
          sx={{ width: '200px' }}
        >
          <MenuItem value="ALL">Todos los tipos</MenuItem>
          {Object.entries(gameModeTranslations).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>

        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}>
          <Button variant="contained" onClick={() => handleOpenModal()}>
            Crear Evento
          </Button>
        </div>
      </div>

      <EventsTable
        data={events?.content || []}
        refreshEvents={fetchEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        handleOpenModal={handleOpenModal}
      />

      {events?.totalElements > 0 && (
        <TablePagination
          pageCount={events?.totalPages}
          currentPage={pagination.page}
          pageSize={pagination.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          totalElements={events?.totalElements}
        />
      )}

      <Modal
        open={open}
        onClose={handleCloseModal}
        title={currentEvent ? 'Modificar Evento' : 'Crear Evento'}
        maxWidth="lg"
      >
        <EventsForm onSubmit={onSubmit} onClose={handleCloseModal} initialEvent={currentEvent} />
      </Modal>
    </>
  );
};

export default Events;
