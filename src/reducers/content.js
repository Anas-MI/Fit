export function content(state = {}, action){
  switch (action.type) {

    case 'CONTENT_SUCCESS':
    const userApiResponse = action.response;
      return Object.assign({},userApiResponse);

    case 'CONTENT_ERROR':
    const userErrorResponse = action.response;
      return Object.assign({},userErrorResponse);

    default:
      return state;
  }
}
