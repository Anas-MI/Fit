export function signup(state = {}, action) {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      const userApiResponse = action.response;
      return Object.assign({}, userApiResponse);

    case 'SIGNUP_ERROR':
      const userErrorResponse = action.response;
      return Object.assign({}, userErrorResponse);

    default:
      return state;
  }
}
