import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';

import Challenges from '@/app/challenges/page';

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}));

describe('Challenges', () => {
  it('renders a heading', () => {
    render(
      <MantineProvider>
        <Challenges />
      </MantineProvider>
    );

    const heading = screen.getByRole('heading', {
      name: 'Engineering Leaderboard'
    });

    expect(heading).toBeInTheDocument();
  });
});
