export const VALID_EMAIL = 'email@email.com';
export const VALID_PASSWORD = '123456';
export const INVALID_EMAIL = 'invalid-email';
export const INVALID_PASSWORD = '12345';

export const EMAIL_INPUT = 'email-input';
export const PASSWORD_INPUT = 'password-input';
export const EMAIL_FIELD = 'email-field';
export const HEADER_CURRENCY_FIELD = 'header-currency-field';
export const CURRENCY_INPUT = 'currency-input';
export const VALUE_INPUT = 'value-input';
export const METHOD_INPUT = 'method-input';
export const TAG_INPUT = 'tag-input';
export const BTN_DELETE = 'delete-btn';
export const DESCRIPTION_INPUT = 'description-input';
export const TOTAL_FIELD = 'total-field';
export const EDIT_INPUT = 'edit-btn';
export const BTN_EDIT = 'edit-btn';

export const tableHeaderList = [
  'Descrição', 'Tag', 'Método de pagamento',
  'Valor', 'Moeda', 'Câmbio utilizado',
  'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
];

export const currenciesValue = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY',
  'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];

export const methodsValue = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

export const tagsValue = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Trabalho'];

export const expenseForTest01 = {
  value: '10.00',
  description: 'Dez dólares',
  currency: 'USD',
  method: 'Cartão de débito',
  tag: 'Trabalho',
  ask: '4.75',
  currencyExtensive: 'Dólar Americano/Real Brasileiro',
  valueConverted: '47.53',
  currencyConverted: 'Real',
  total: (10 * 4.7531).toFixed(2),
};

export const expenseForTest02 = {
  value: '2.00',
  description: 'Dois Bitcoins',
  currency: 'BTC',
  method: 'Cartão de crédito',
  tag: 'Lazer',
  ask: '147.235',
  currencyExtensive: 'Bitcoin/Real Brasileiro',
  valueConverted: '294.470',
  currencyConverted: 'Real',
  total: (2 * 147.235).toFixed(2),
};
