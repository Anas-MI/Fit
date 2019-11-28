import Constants from '../config/constants';
import Snackbar from 'react-native-snackbar';
import {Platform} from 'react-native';

export function loginUser(user) {
  return dispatch =>
    fetch(Constants.API_BASE_URL + 'user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: '123',
      },
      body: JSON.stringify({
        email: user.username,
        password: user.password,
        android_device_token: Platform.OS === 'android' ? user.fcm : '',
        ios_device_token: Platform.OS === 'ios' ? user.fcm : '',
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('login is', responseData);
        if (responseData.success) {
          dispatch(loginSuccess(responseData));
        } else {
          dispatch(loginFailed(responseData));
        }
      })
      .catch(error => {
        console.log(error);
      });
}

export function loginSuccess(response) {
  return {
    type: 'LOGIN_SUCCESS',
    response,
  };
}

export function loginFailed(response) {
  Snackbar.show({
    title: response.error.description,
    duration: Snackbar.LENGTH_SHORT,
  });
  return {
    type: 'LOGIN_ERROR',
    response,
  };
}
