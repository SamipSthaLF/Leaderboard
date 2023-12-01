import { render, screen } from '@testing-library/react';
import Home from '../app/challenges/page';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}));

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <MantineProvider>
        <Home />
      </MantineProvider>
    );

    const heading = screen.getByRole('heading', {
      name: 'Engineering Leaderboard'
    });

    expect(heading).toBeInTheDocument();
  });
});
