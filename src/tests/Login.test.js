import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import { EMAIL_INPUT, PASSWORD_INPUT, INVALID_EMAIL, INVALID_PASSWORD, VALID_EMAIL, VALID_PASSWORD } from './utils/constants';

describe('tests for Login component', () => {
  it('must have a field to enter email, password and button to send', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
    expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('send button starts disabled', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();
  });

  it('send button is only enabled when email and passwords are valid', () => {
    renderWithRouterAndRedux(<App />);

    // invalid email and invalid password
    userEvent.type(screen.getByTestId(EMAIL_INPUT), INVALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), INVALID_PASSWORD);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();

    userEvent.clear(screen.getByTestId(EMAIL_INPUT));
    userEvent.clear(screen.getByTestId(PASSWORD_INPUT));

    // valid email and valid password
    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled();
  });

  it('email entered in page Login appears in page Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByText(VALID_EMAIL)).toBeInTheDocument();
  });
});
