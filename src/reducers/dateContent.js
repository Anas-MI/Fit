export function dateContent(state = {}, action){
  switch (action.type) {

    case 'DATECONTENT_SUCCESS':
    const userApiResponse = action.response;
      return Object.assign({},userApiResponse);

    case 'DATECONTENT_ERROR':
    const userErrorResponse = action.response;
      return Object.assign({},userErrorResponse);

    default:
      return state;
  }
}
