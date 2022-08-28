import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const VALID_EMAIL = 'email@email.com';
const VALID_PASSWORD = '123456';
const ID_EMAIL_INPUT = 'email-input';
const ID_PASSWORD_INPUT = 'password-input';

describe('tests for Wallet component', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(ID_EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(ID_PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));
  });

  it('has a header with the amount of money and the Brazilian currency', () => {
    expect(screen.getByTestId('total-field')).toBeInTheDocument();
    expect(screen.getByTestId('total-field')).toHaveTextContent('0.00');
    expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
    expect(screen.getByTestId('header-currency-field')).toHaveTextContent('BRL');
  });

  it('has the input of value, currency, method, tag, description and add button', () => {
    expect(screen.getByTestId('value-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
  });
});
