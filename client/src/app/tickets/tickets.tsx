import { Ticket, User } from '@acme/shared-models';
import styles from './tickets.module.css';
import useGetList from '../hooks/useGetList';
import { API_ENDPOINTS } from '../api/endpoints';
import List from '../components/List';
import TicketItem from './components/TicketItem';
import { Link } from 'react-router-dom';
import Filter, { FilterFields } from '../components/Filter';
import { FormEvent, useMemo, useState } from 'react';
import TicketForm from './components/TicketForm';
import useCreateOne from '../hooks/useCreateOne';

const filterData: FilterFields = {
  status: {
    type: 'select',
    data: [
      { value: 'all', text: 'all' },
      { value: true, text: 'complete' },
      { value: false, text: 'incomplete' },
    ],
    value: null,
  },
};

export function Tickets() {
  const [filters, setFilters] = useState({
    status: 'all',
  });

  const { data: users } = useGetList<User>({
    url: API_ENDPOINTS.user.getList,
  });

  const { data: tickets, fetch: fetchTickets } = useGetList<Ticket>({
    url: API_ENDPOINTS.ticket.getList,
  });

  const { create, isLoading } = useCreateOne({
    url: API_ENDPOINTS.ticket.createOne,
    successCallback: fetchTickets,
  });

  const filteredTickets = useMemo<Ticket[]>(() => {
    if (filters.status === 'all') return tickets;
    return tickets.filter(
      (ticket: Ticket) => String(ticket.completed) === filters.status
    );
  }, [filters, tickets]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      description: HTMLInputElement;
    };
    if (!formElements.description.value) return;
    create({ description: formElements.description.value });
    e.currentTarget.reset();
  };

  return (
    <div className={styles['tickets']}>
      <h2>Tickets ({(tickets || []).length})</h2>
      {isLoading && <p>loading...</p>}
      <div className={styles['tickets-container']}>
        <div className={styles['tickets-controller']}>
          <TicketForm onSubmit={handleSubmitForm} />

          <Filter
            fields={filterData}
            onChange={(filter) => {
              setFilters((prevFilter) => ({
                ...prevFilter,
                ...filter,
              }));
            }}
          />
        </div>

        <List
          data={filteredTickets?.sort((a, b) => b.id - a.id) || []}
          renderItem={(ticket: Ticket) => {
            const user = users?.find((u: User) => u.id === ticket.assigneeId);
            return <TicketItem ticket={ticket} user={user} />;
          }}
        />
      </div>
    </div>
  );
}

export default Tickets;
