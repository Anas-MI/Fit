export function howItWorks(state = {}, action){
  switch (action.type) {

    case 'HIW_SUCCESS':
    const userApiResponse = action.response;
      return Object.assign({},userApiResponse);

    case 'HIW_ERROR':
    const userErrorResponse = action.response;
      return Object.assign({},userErrorResponse);

    default:
      return state;
  }
}
