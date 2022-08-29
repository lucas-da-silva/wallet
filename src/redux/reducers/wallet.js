// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, FETCH_API_SUCCESS, REMOVE_EXPENSE, REQUESTING } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
  ask: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isFetching: false,
};

const removeAsk = (expense) => {
  const { value, currency, exchangeRates } = expense;
  const exchangeRate = exchangeRates[currency].ask;
  return (value * exchangeRate).toFixed(2);
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUESTING:
    return {
      ...state,
      isFetching: true,
    };
  case FETCH_API_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.data).filter((currency) => currency !== 'USDT'),
      isFetching: false,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      ask: state.ask + action.ask,
      isFetching: false,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
      ask: state.ask - (removeAsk(state.expenses.find(({ id }) => id === action.id))),
    };
  default:
    return {
      ...state,
    };
  }
};

export default wallet;
