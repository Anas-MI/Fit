import Constants from '../config/constants';
import Snackbar from 'react-native-snackbar';

export function addFavorite(data) {
  return dispatch =>
    fetch(Constants.API_BASE_URL + 'favourite/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: data.date,
        accessToken: data.accessToken,
        synergistic_id: data.id,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('add favorite response', responseData);
        if (responseData.success) {
          dispatch(onSuccess(responseData, data.date, data.name, data.goal));
        } else {
          dispatch(onFailed(responseData, data.date, data.name, data.goal));
        }
      })
      .catch(error => {
        console.log(error);
      });
}

export function onSuccess(response, date, name, goal) {
  return {
    type: 'ADD_FAV_SUCCESS',
    response,
    date,
    name,
    goal,
  };
}

export function onFailed(response, date, name, goal) {
  Snackbar.show({
    title: response.error.description,
    duration: Snackbar.LENGTH_SHORT,
  });
  return {
    type: 'ADD_FAV_ERROR',
    response,
    date,
    name,
    goal,
  };
}
