import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const VALID_EMAIL = 'email@email.com';
const VALID_PASSWORD = '123456';
const ID_EMAIL_INPUT = 'email-input';
const ID_PASSWORD_INPUT = 'password-input';

describe('tests for App component', () => {
  it('from Login component to Wallet component when clicked on the enter button', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    userEvent.type(screen.getByTestId(ID_EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(ID_PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(history.location.pathname).toBe('/carteira');
  });
});
