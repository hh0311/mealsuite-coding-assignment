import styles from './style.module.css';
import { Ticket, User } from '@acme/shared-models';

import Select, { SelectOptions } from 'client/src/app/components/Select';
import { Link, useLocation } from 'react-router-dom';

export type TicketItemProps = {
  ticket?: Ticket;
  user?: User;
  assignees?: SelectOptions[];
  onClick?: (ticket: Ticket) => void;
};

function TicketItem({ ticket, user, assignees }: TicketItemProps) {
  const { assigneeId, completed, description, id } = ticket || {};
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={styles['ticket-item']}>
      {isHomePage && <Link to={`/${ticket?.id}`}>Go to details</Link>}
      <h3>ID: {id}</h3>
      <h4>{description}</h4>

      {isHomePage ? (
        <p>Status: {completed ? 'Completed' : 'Incomplete'}</p>
      ) : (
        <Select
          label="Status"
          fieldName="completed"
          options={[
            { value: String(true), text: 'Complete' },
            { value: String(false), text: 'Incomplete' },
          ]}
          defaultValue={String(completed)}
        />
      )}

      {isHomePage ? (
        <p>Assignee: {user?.name}</p>
      ) : (
        <Select
          label="Assignee"
          fieldName="assignee"
          options={assignees}
          defaultValue={assigneeId ? String(assigneeId) : '-1'}
        />
      )}
    </div>
  );
}

TicketItem.propTypes = {};

export default TicketItem;
