import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import {
  currenciesValue, CURRENCY_INPUT, DESCRIPTION_INPUT, EMAIL_FIELD, EMAIL_INPUT,
  expenseForTest01, expenseForTest02, HEADER_CURRENCY_FIELD, methodsValue, METHOD_INPUT,
  PASSWORD_INPUT, tableHeaderList, tagsValue, TAG_INPUT, TOTAL_FIELD, VALID_EMAIL,
  VALID_PASSWORD, VALUE_INPUT,
} from './utils/constants';

describe('tests for Wallet component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));
  });

  it('has a header with the the email entered at login, amount of money and the Brazilian currency', () => {
    expect(screen.getByTestId(EMAIL_FIELD)).toHaveTextContent(VALID_EMAIL);
    expect(screen.getByTestId(TOTAL_FIELD)).toBeInTheDocument();
    expect(screen.getByTestId(TOTAL_FIELD)).toHaveTextContent('0.00');
    expect(screen.getByTestId(HEADER_CURRENCY_FIELD)).toBeInTheDocument();
    expect(screen.getByTestId(HEADER_CURRENCY_FIELD)).toHaveTextContent('BRL');
  });

  it('has the input of value, currency, method, tag, description and add button', () => {
    expect(screen.getByTestId(VALUE_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(CURRENCY_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(METHOD_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(TAG_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(DESCRIPTION_INPUT)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
  });

  it('input of currency have the specific acronyms', async () => {
    const currencyInput = await screen.findByTestId(CURRENCY_INPUT);
    currenciesValue.forEach((currency) => {
      userEvent.selectOptions(currencyInput, currency);
      expect(currencyInput).toHaveValue(currency);
    });
  });

  it('input of method have the specific acronyms', () => {
    methodsValue.forEach((method) => {
      userEvent.selectOptions(screen.getByTestId(METHOD_INPUT), method);
      expect(screen.getByTestId(METHOD_INPUT)).toHaveValue(method);
    });
  });

  it('input of tag have the specific acronyms', () => {
    tagsValue.forEach((tag) => {
      userEvent.selectOptions(screen.getByTestId(TAG_INPUT), tag);
      expect(screen.getByTestId(TAG_INPUT)).toHaveValue(tag);
    });
  });

  it('has a table that has a header with the specific fields', () => {
    expect(screen.getAllByRole('columnheader')).toHaveLength(tableHeaderList.length);
    tableHeaderList.forEach((tableHeader) => {
      expect(screen.getByRole('columnheader', { name: tableHeader })).toBeInTheDocument();
    });
  });

  it('When clicked on the add task button, it adds the information in the table', async () => {
    const { value, description, method, tag, currency, total, ask,
      currencyExtensive, valueConverted, currencyConverted } = expenseForTest01;
    const tableValues = [
      description, tag, method, value, currencyExtensive, ask,
      valueConverted, currencyConverted,
    ];

    userEvent.type(screen.getByTestId(VALUE_INPUT), value);
    userEvent.selectOptions(screen.getByTestId(CURRENCY_INPUT), currency);
    userEvent.selectOptions(screen.getByTestId(METHOD_INPUT), method);
    userEvent.selectOptions(screen.getByTestId(TAG_INPUT), tag);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), description);
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    expect(await screen.findByTestId(TOTAL_FIELD)).toHaveTextContent(total);
    expect(await screen.findByTestId(VALUE_INPUT)).toHaveTextContent('');
    expect(await screen.findByTestId(DESCRIPTION_INPUT)).toHaveTextContent('');
    tableValues.forEach((tableValue) => {
      expect(screen.getByRole('cell', { name: tableValue })).toBeInTheDocument();
    });
  });

  it('when the "Excluir" button is clicked, the information of the respective element is removed from the table', async () => {
    const { value, description } = expenseForTest01;

    userEvent.type(screen.getByTestId(VALUE_INPUT), value);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), description);
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    expect(await screen.findByRole('cell', { name: value })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: description })).toBeInTheDocument();

    userEvent.click(await screen.findByTestId('delete-btn'));

    expect(screen.queryByRole('cell', { name: value })).not.toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: description })).not.toBeInTheDocument();
  });

  it('when the "Editar" button is clicked, it is possible to change the information of the chosen expense', async () => {
    const { value, description } = expenseForTest01;

    userEvent.type(screen.getByTestId(VALUE_INPUT), value);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), description);
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    expect(await screen.findByRole('cell', { name: value })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: description })).toBeInTheDocument();

    userEvent.click(screen.getByTestId('edit-btn'));

    userEvent.clear(screen.getByTestId(VALUE_INPUT));
    userEvent.clear(screen.getByTestId(DESCRIPTION_INPUT));

    userEvent.type(screen.getByTestId(VALUE_INPUT), expenseForTest02.value);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), expenseForTest02.description);
    userEvent.click(screen.getByRole('button', { name: /editar despesa/i }));

    expect(await screen.findByRole('cell', { name: expenseForTest02.value })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: expenseForTest02.description })).toBeInTheDocument();
  });
});
