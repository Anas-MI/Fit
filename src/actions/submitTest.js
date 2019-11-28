import Constants from '../config/constants';
import Snackbar from 'react-native-snackbar';

export function submit(data) {
  return dispatch =>
    fetch(Constants.API_BASE_URL + 'journal/feed', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: data.answer,
        accessToken: data.accessToken,
        date: data.date,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('at submit is', responseData);
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
  Snackbar.show({
    title: response.response,
    duration: Snackbar.LENGTH_SHORT,
  });
  return {
    type: 'SUBMIT_SUCCESS',
    response,
  };
}

export function getFailed(response) {
  return {
    type: 'SUBMIT_ERROR',
    response,
  };
}
