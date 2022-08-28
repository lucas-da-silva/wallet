import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const INVALID_EMAIL = 'invalid-email';
const INVALID_PASSWORD = '12345';
const VALID_EMAIL = 'email@email.com';
const VALID_PASSWORD = '123456';
const ID_EMAIL_INPUT = 'email-input';
const ID_PASSWORD_INPUT = 'password-input';

describe('tests for Login component', () => {
  it('must have a field to enter email, password and button to send', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
    expect(screen.getByTestId(ID_EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(ID_PASSWORD_INPUT)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('send button starts disabled', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();
  });

  it('send button is only enabled when email and passwords are valid', () => {
    renderWithRouterAndRedux(<App />);

    // invalid email and invalid password
    userEvent.type(screen.getByTestId(ID_EMAIL_INPUT), INVALID_EMAIL);
    userEvent.type(screen.getByTestId(ID_PASSWORD_INPUT), INVALID_PASSWORD);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();

    userEvent.clear(screen.getByTestId(ID_EMAIL_INPUT));
    userEvent.clear(screen.getByTestId(ID_PASSWORD_INPUT));

    // valid email and valid password
    userEvent.type(screen.getByTestId(ID_EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(ID_PASSWORD_INPUT), VALID_PASSWORD);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled();
  });

  it('email entered in page Login appears in page Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(ID_EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(ID_PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByText(VALID_EMAIL)).toBeInTheDocument();
  });
});
