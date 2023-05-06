import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders "Go Back" button when location is not home', () => {
    render(
        //!need path?
      <MemoryRouter initialEntries={['/example']}>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/go back/i)).toBeInTheDocument();
  });

  test('does not render "Go Back" button when location is home', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.queryByText(/go back/i)).not.toBeInTheDocument();
  });

  test('clicking "Go Back" button calls navigate function with -1', () => {
    const navigate = jest.fn();
    render(
        //!need path?
      <MemoryRouter initialEntries={['/example']}>
        <Footer navigate={navigate} />
      </MemoryRouter>
    );
    const goBackButton = screen.getByRole('button', { name: /go back/i });
    userEvent.click(goBackButton);
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  test('renders "Made with heart by the Cats" message', () => {
    render(
        //!need path?
      <MemoryRouter initialEntries={['/example']}>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/made with ❤️ by the cats/i)).toBeInTheDocument();
  });
});
