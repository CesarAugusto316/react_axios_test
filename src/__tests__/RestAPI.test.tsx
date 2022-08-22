import {
  describe, expect, it, Mocked, vi, beforeEach,
} from 'vitest';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { validationSchema } from '../componets';
import { App } from '../App';


vi.mock('axios');

describe('RestApi', () => {
  const mockedAxios = axios as Mocked<typeof axios>;

  beforeEach(() => {
    render(<App />);
  });

  it('should not show "Welcome" on start', () => {
    expect(screen
      .queryByRole('heading', { name: /welcome/i }))
      .not.toBeInTheDocument();

    expect(screen
      .getByRole('form'))
      .toBeInTheDocument();
  });

  it('should login', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUyMjg5LCJ1c2VybmFtZSI6IkNlc2FyIiwiZW1haWwiOiJyaXZlcmFtaXJhbmRhY0BnbWFpbC5jb20iLCJpYXQiOjE2NjExMzMzMzQsImV4cCI6MTY2MTE0NDEzNH0.DBcamVYUO3iQZY9wgFm3oJN282qSiR1pUfCRa54COQU';

    mockedAxios.post.mockResolvedValueOnce({ data: { token } });

    const inputTest = {
      email: 'riveramirandac@gmail.com',
      discordId: '890827972238528572',
    };

    const user = userEvent.setup();

    try {
      const validTest = await validationSchema.validate(inputTest);
      await user.type(screen
        .getByPlaceholderText(/discordid/i), validTest.discordId);
      await user.type(screen
        .getByPlaceholderText(/email/i), validTest.email);
      await user.click(screen
        .getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          `${import.meta.env.VITE_TODOS_API_URL}/auth/login`,
          validTest,
        );
      });

      expect(screen
        .getByRole('heading', { name: /welcome/i }))
        .toBeInTheDocument();
    } catch (error) {
      console.log(error);
    }
  });
});
