import Snackbar from 'react-native-snackbar';
import constants from '../config/constants';

export function getFitGoals(accessToken, userId) {
  return dispatch =>
    fetch(constants.API_BASE_URL + 'user/media?accessToken=' + accessToken, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('my fit goals response data', responseData);
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
    type: 'GETFITGOALS_SUCCESS',
    response,
  };
}

export function getFailed(response) {
  return {
    type: 'GETFITGOALS_ERROR',
    response,
  };
}
