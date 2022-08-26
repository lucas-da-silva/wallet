import getApi from '../../services';

export const REQUESTING = 'REQUESTING';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_API_ERROR = 'FETCH_API_ERROR';
export const EMAIL_CHANGED = 'EMAIL_CHANGED';

export const emailChange = (email) => ({
  type: EMAIL_CHANGED,
  email,
});

const requesting = () => ({
  type: REQUESTING,
});

const fetchApiSuccess = (data) => ({
  type: FETCH_API_SUCCESS,
  data,
});

const fetchApiError = (error) => ({
  type: FETCH_API_ERROR,
  error,
});

export const fetchApi = () => async (dispatch) => {
  dispatch(requesting());
  try {
    const data = await getApi();
    dispatch(fetchApiSuccess(data));
  } catch (error) {
    dispatch(fetchApiError(error));
  }
};
