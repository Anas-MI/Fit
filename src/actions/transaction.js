import Constants from '../config/constants';

export function addCardSubscription(data) {
  return dispatch => {
    return fetch(Constants.API_BASE_URL + 'subscription/creditcard', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        cardNumber: data.cardNumber,
        cvv: data.cvv,
        month: data.month,
        year: data.year,
        accessToken: data.accessToken,
        id: data.id,
        amount: data.amount,
        shippingId: data.shippingId,
      }),
    });
  };
}

export function addPaypalSubscription(data) {
  return dispatch => {
    return fetch(Constants.API_BASE_URL + 'subscription/paypal', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: data.accessToken,
        id: data.id,
        amount: data.amount,
        shippingId: data.shippingId,
      }),
    });
  };
}
