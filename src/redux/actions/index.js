import getApi from '../../services';

export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const FINESH_EDIT = 'FINESH_EDIT';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const emailChange = (email) => ({
  type: EMAIL_CHANGED,
  email,
});

export const addExpense = (expense, ask) => ({
  type: ADD_EXPENSE,
  expense,
  ask,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const fineshEditForm = (expense, ask) => ({
  type: FINESH_EDIT,
  expense,
  ask,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

const fetchApiSuccess = (data) => ({
  type: FETCH_API_SUCCESS,
  data,
});

export const fetchApi = () => async (dispatch) => {
  const data = await getApi();
  dispatch(fetchApiSuccess(data));
};
