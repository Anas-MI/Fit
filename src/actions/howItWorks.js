import Constants from '../config/constants';
import Snackbar from 'react-native-snackbar';

export function howItWorks() {
  return dispatch =>
    fetch(Constants.API_BASE_URL + 'howitworks', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: '123',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        if (responseData.success) {
          dispatch(onSuccess(responseData));
        } else {
          dispatch(onFail(responseData));
        }
      })
      .catch(error => {
        console.log(error);
      });
}

export function onSuccess(response) {
  return {
    type: 'HIW_SUCCESS',
    response,
  };
}

export function onFail(response) {
  Snackbar.show({
    title: response.error.description,
    duration: Snackbar.LENGTH_SHORT,
  });
  return {
    type: 'HIW_ERROR',
    response,
  };
}
