export function aboutUs(state = {}, action){
  switch (action.type) {

    case 'ABOUT_SUCCESS':
    const userApiResponse = action.response;
      return Object.assign({},userApiResponse);

    case 'ABOUT_ERROR':
    const userErrorResponse = action.response;
      return Object.assign({},userErrorResponse);
 
    default:
      return state;
  }
}
