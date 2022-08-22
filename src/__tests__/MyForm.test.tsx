import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyForm, validationSchema } from '../componets';


describe('<MyForm/>', () => {
  const handleSubmit = vi.fn();

  beforeEach(() => {
    render(<MyForm onSubmit={handleSubmit} />);
    handleSubmit.mockClear();
  });

  it('should have empty "inputs" on start', () => {
    expect(screen
      .getByRole('form'))
      .toHaveFormValues({
        discordId: '',
        email: '',
      });
  });

  it('should disable submit "button" on start', () => {
    expect(screen
      .getByRole('button', { name: /submit/i }))
      .toBeDisabled();
  });

  it('should enable "button" when form inputs are valid', async () => {
    const test = {
      email: 'riveramirandac@gmail.com',
      discordId: '890827972238528572',
    };
    const user = userEvent.setup();

    try {
      const validTest = await validationSchema.validate(test);
      await user.type(screen
        .getByPlaceholderText(/discordid/i), validTest.discordId);

      await user.type(screen
        .getByPlaceholderText(/email/i), validTest.email);

      expect(screen
        .getByRole('button', { name: /submit/i }))
        .toBeEnabled();
    } catch (error) {
      console.log(error);
    }
  });

  it('should disable "button" after submision', async () => {
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

      expect(handleSubmit).toHaveBeenCalledWith(validTest);
      expect(handleSubmit).toBeCalledTimes(1);

      expect(screen
        .getByRole('button', { name: /submit/i }))
        .toBeDisabled();
    } catch (error) {
      console.log(error);
    }
  });

  it('should fail when validating with wrong data', async () => {
    const inputTest = {
      email: 'rivera',
      discordId: '890827972',
    };
    const user = userEvent.setup();

    try {
      await validationSchema.validate(inputTest);
      //
    } catch (error: any) {
      console.log(error.message);
      await user.type(screen
        .getByPlaceholderText(/discordid/i), inputTest.discordId);

      await user.type(screen
        .getByPlaceholderText(/email/i), inputTest.email);

      // not Valid -> button "disabled"
      expect(screen
        .getByRole('button', { name: /submit/i }))
        .toBeDisabled();

      await user.click(screen
        .getByRole('button', { name: /submit/i }));

      expect(handleSubmit).not.toHaveBeenCalledWith(inputTest);
      expect(handleSubmit).toBeCalledTimes(0);

      // didn't trigger handleSubmit when "button" was clicked, so:
      expect(screen
        .getByRole('button', { name: /submit/i }))
        .toBeDisabled();
    }
  });
});
