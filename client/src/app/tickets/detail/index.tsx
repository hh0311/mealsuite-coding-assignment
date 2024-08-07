import React, { FormEvent, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useGetOne from '../../hooks/useGetOne';
import { API_ENDPOINTS } from '../../api/endpoints';
import TicketItem from '../components/TicketItem';
import { Ticket, User } from '@acme/shared-models';
import { SelectOptions } from '../../components/Select';
import useGetList from '../../hooks/useGetList';
import useUpdateOne from '../../hooks/useUpdateOne';
import useDeleteOne from '../../hooks/useDeleteOne';

import styles from './style.module.css';

function TicketDetails() {
  const { id } = useParams();

  const { data: users } = useGetList<User>({ url: API_ENDPOINTS.user.getList });
  const { data: ticket, fetch: fetchTicket } = useGetOne<Ticket>({
    url: API_ENDPOINTS.ticket.getOne,
    params: {
      id,
    },
  });

  const user = users.find((u) => u.id === ticket?.assigneeId);

  const { update: updateAssign, isLoading: updateAssignLoading } = useUpdateOne(
    {
      url: API_ENDPOINTS.ticket.assignOne,
      params: { ticketId: id },
      successCallback: fetchTicket,
    }
  );

  const { update: updateUnassign, isLoading: updateUnassignLoading } =
    useUpdateOne({
      url: API_ENDPOINTS.ticket.unassignOne,
      params: { ticketId: id },
      successCallback: fetchTicket,
    });

  const { update: updateComplete, isLoading: updateCompleteLoading } =
    useUpdateOne({
      url: API_ENDPOINTS.ticket.markComplete,
      params: { id },
      successCallback: fetchTicket,
    });

  const { remove: deleteOne } = useDeleteOne({
    url: API_ENDPOINTS.ticket.markIncomplete,
    params: { id },
    successCallback: fetchTicket,
  });

  const mappingUserToOptions: SelectOptions[] = useMemo(() => {
    const userOptions: SelectOptions[] = users.map((a: User) => ({
      value: String(a.id),
      text: a.name,
    }));

    return userOptions.concat({ value: '-1', text: '**Unassign**' });
  }, [users]);

  const isLoading =
    updateAssignLoading || updateUnassignLoading || updateCompleteLoading;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      assignee: HTMLSelectElement;
      completed: HTMLSelectElement;
    };

    if (String(formElements.assignee.value) !== String(user?.id)) {
      if (String(formElements.assignee.value) === '-1') {
        updateUnassign(undefined, {
          userId: formElements.assignee.value,
        });
      } else {
        updateAssign(undefined, {
          userId: formElements.assignee.value,
        });
      }
    }

    if (String(formElements.completed.value) !== String(ticket?.completed)) {
      if (formElements.completed.value === 'true') {
        updateComplete();
      } else {
        deleteOne();
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles['tickets-detail']}>
      {isLoading && <p>loading...</p>}
      <TicketItem
        ticket={ticket}
        user={user}
        assignees={mappingUserToOptions}
      />
      <button type="submit">Update</button>
    </form>
  );
}

TicketDetails.propTypes = {};

export default TicketDetails;
