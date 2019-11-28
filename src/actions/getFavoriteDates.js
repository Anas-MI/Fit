import Constants from '../config/constants';
import Snackbar from 'react-native-snackbar';

export function getFavorites(accessToken) {
  return dispatch =>
    fetch(
      Constants.API_BASE_URL + 'favourite/getAll?accessToken=' + accessToken,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseData => {
        console.log('at response data', responseData);
        if (responseData.success) {
          dispatch(getSuccess(responseData));
        } else {
          dispatch(getFailed(responseData));
        }
      })
      .catch(error => {
        console.log(error);
      });
}

export function getSuccess(response) {
  return {
    type: 'GETFAVORITE_SUCCESS',
    response,
  };
}

export function getFailed(response) {
  return {
    type: 'GETFAVORITE_ERROR',
    response,
  };
}
