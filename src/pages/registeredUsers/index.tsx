/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router';
import Title from '../../components/title/Title';
import BackBreadcrumb from '../../components/navigation/BackBreadcrumb';
import { SearchField } from '../../components/inputs/search/SearchField';
import { useEffect, useMemo, useState } from 'react';
import { eventService } from '../../services/event.service';
import { Event } from '../../types/api/event';
import { CustomerEvent } from '../../types/api/eventParticipants';
import { eventRegistrationService } from '../../services/eventRegistration.service';
import TanStackTable from '../../components/table/Table';
import { getCells } from './cells';

const RegisteredUser = () => {
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<Event>({} as Event);
  const [_loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [participants, setParticipants] = useState<CustomerEvent[]>([]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEventById(Number(id));
      const participants = await eventRegistrationService.getEventParticipants(Number(id));

      setEvent(data);
      setParticipants(participants.map((x) => x.customerDTO));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearch(searchInput);
    }
  };

  const filteredParticipants = useMemo(() => {
    if (!search.trim()) {
      return participants;
    }

    const searchTerm = search.toLowerCase().trim();

    return participants.filter((participant) => {
      const name = participant.name?.toLowerCase() || '';
      const dni = participant.dni?.toString() || '';
      const email = participant.email?.toLowerCase() || '';

      return name.includes(searchTerm) || dni.includes(searchTerm) || email.includes(searchTerm);
    });
  }, [participants, search]);

  return (
    <>
      <BackBreadcrumb />
      <Title text={`${event?.title?.toUpperCase()}`} />
      <SearchField value={searchInput} onChange={setSearchInput} onKeyDown={handleKeyPress} />
      <div style={{ marginTop: '20px' }}>
        <TanStackTable columns={getCells()} data={filteredParticipants} />
      </div>
    </>
  );
};

export default RegisteredUser;
