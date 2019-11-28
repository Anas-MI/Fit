export function settings(state = {}, action){
  switch (action.type) {

    case 'SETTING_SUCCESS':
    const userApiResponse = action.response;
      return Object.assign({},userApiResponse);

    case 'SETTING_ERROR':
    const userErrorResponse = action.response;
      return Object.assign({},userErrorResponse);

    default:
      return state;
  }
}
