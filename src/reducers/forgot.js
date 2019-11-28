export function forgot(state = {}, action){
  switch (action.type) {

    case 'FORGOT_SUCCESS':
    const userApiResponse = action.response;
      return Object.assign({},userApiResponse);

    case 'FORGOT_ERROR':
    const userErrorResponse = action.response;
      return Object.assign({},userErrorResponse);

    default:
      return state;
  }
}
