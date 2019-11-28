import Constants from '../config/constants';

export function validateEbook(data) {
  return dispatch => {
    return fetch(
      Constants.API_BASE_URL + 'ebook/validate?accessToken=' + data.accessToken,
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

export function shippingAddress(data) {
  return dispatch => {
    return fetch(Constants.API_BASE_URL + 'shipping/address', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: data.accessToken,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        country: data.country,
        state: data.state,
        city: data.city,
        pincode: data.pincode,
      }),
    });
  };
}
