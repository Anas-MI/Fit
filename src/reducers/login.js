export function login(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const userApiResponse = action.response;
      return Object.assign({}, userApiResponse);

    case 'LOGIN_ERROR':
      const userErrorResponse = action.response;
      return Object.assign({}, userErrorResponse);

    default:
      return state;
  }
}
