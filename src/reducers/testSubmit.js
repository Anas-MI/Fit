export function testSubmit(state = {}, action){
  switch (action.type) {

    case 'SUBMIT_SUCCESS':
    const userApiResponse = action.response;
      return Object.assign({},userApiResponse);

    case 'SUBMIT_ERROR':
    const userErrorResponse = action.response;
      return Object.assign({},userErrorResponse);

    default:
      return state;
  }
}
