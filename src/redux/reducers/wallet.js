import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  FETCH_API_SUCCESS, FINESH_EDIT, REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  ask: 0,
};

const removeAsk = (expense) => {
  const { value, currency, exchangeRates } = expense;
  const exchangeRate = exchangeRates[currency].ask;
  return (value * exchangeRate).toFixed(2);
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_API_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.data).filter(
        (currency) => currency !== 'USDT',
      ),
      isFetching: false,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      ask: state.ask + action.ask,
      isFetching: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case FINESH_EDIT:
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: state.expenses.map((expense) => (
        expense.id === action.expense.id ? action.expense : expense
      )),
      ask: (state.ask - removeAsk(
        state.expenses.find((expense) => expense.id === action.expense.id),
      )) + action.ask,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
      ask: state.ask - removeAsk(state.expenses.find(({ id }) => id === action.id)),
    };
  default:
    return {
      ...state,
    };
  }
};

export default wallet;
