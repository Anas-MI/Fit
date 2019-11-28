export function fitGoals(state = {}, action) {
  switch (action.type) {
    case 'GETFITGOALS_SUCCESS':
      const userApiResponse = action.response;
      return Object.assign({}, userApiResponse);

    case 'GETFITGOALS_ERROR':
      const userErrorResponse = action.response;
      return Object.assign({}, userErrorResponse);

    default:
      return state;
  }
}
