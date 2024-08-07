import { getByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Tickets from '../tickets/tickets';
import TicketDetails from '../tickets/detail';
import { api } from '../api';
import {
  createBrowserRouter,
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom';

test('Create New Ticket', async () => {
  render(<Tickets />);

  const descriptionInput = screen.getByLabelText('Description');

  await userEvent.type(descriptionInput, '12345678901234566');

  await userEvent.click(screen.getByText('Create Ticket'));

  await waitFor(() => {
    expect(
      screen.findByText(/12345678901234566/i)
    ).resolves.toBeInTheDocument();
  });
});

test('Render detail page', async () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Tickets />} />
        <Route path="/details/1" element={<TicketDetails />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(
      screen.findByText(/Install a monitor arm/)
    ).resolves.toBeInTheDocument();
  });
});
