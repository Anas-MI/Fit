import { splice, assoc, freeze, assocIn, dissocIn, unsetIn, unshift , map , find } from 'icepick';
import _ from 'lodash';

const initialState = freeze({
  data: [],
});

export default (state = initialState, action={}) => {
  switch (action.type) {
    case 'WORKOUT_LIST':
      return assoc(state, 'data', action.response.response);

    default:
      return state;
  }
};
