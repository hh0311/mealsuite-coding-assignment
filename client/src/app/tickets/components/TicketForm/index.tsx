import { FormEvent } from 'react';
import styles from './style.module.css';
type TicketFormProps = {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};
function TicketForm({ onSubmit }: TicketFormProps) {
  return (
    <form className={styles['ticket-form']} onSubmit={onSubmit}>
      <label htmlFor="description">Description</label>
      <input id="description" type="text" name="title" />
      <button type="submit" data-testid="create-ticket">
        Create Ticket
      </button>
    </form>
  );
}

TicketForm.propTypes = {};

export default TicketForm;
