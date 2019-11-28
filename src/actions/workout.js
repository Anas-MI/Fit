import Constants from '../config/constants';

export function getWorkouts() {
  return dispatch =>
    fetch(Constants.API_BASE_URL + 'workout/get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.success) {
          dispatch(getSuccess(responseData));
        }
      })
      .catch(error => {
        console.log(error);
      });
}

export function validateWorkout(data) {
  return dispatch => {
    return fetch(
      Constants.API_BASE_URL +
        'workout/' +
        data.id +
        '/validate?accessToken=' +
        data.accessToken,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
  };
}

export function validateAllWorkout(data) {
  return dispatch => {
    return fetch(
      Constants.API_BASE_URL +
        'workout/validate/all?accessToken=' +
        data.accessToken,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
  };
}

export function validatePromocode(data) {
  return dispatch => {
    return fetch(Constants.API_BASE_URL + 'promocode/validate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: data.accessToken,
        id: data.id,
        code: data.code,
      }),
    });
  };
}

export function getSuccess(response) {
  return {
    type: 'WORKOUT_LIST',
    response,
  };
}

export function getFailed(response) {
  return {
    type: 'WORKOUT_ERROR',
    response,
  };
}
