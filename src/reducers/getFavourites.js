import { splice, assoc, freeze, assocIn, dissocIn, unsetIn, unshift , map , find } from 'icepick';
import _ from 'lodash';
import moment from 'moment';

const initialState = freeze({
  favoriteDates: [],
});

export default (state = initialState, action={}) => {
  switch (action.type) {

    case 'GETFAVORITE_SUCCESS':
      var array = [];
      action.response.response.forEach((val) => {
        const data = {
          name: val.synergistic.name,
          date: val.created_at.substring(0, 10),
          goal: val.synergistic.goal,
        }
        array.push(data)
      });
      console.log("array after get is",array);
      return assoc(state, 'favoriteDates', array.reverse());

    case 'ADD_FAV_SUCCESS':
      if (action.response.response === 'Successfully removed from Favourite') {
          const unfavIndex = _.findIndex(state.favoriteDates, { 'date':action.date });
          console.log("index is ",unfavIndex);
          const deleteFrom = dissocIn(state, ['favoriteDates', [unfavIndex]])
          const cleanFrom = assoc(state, 'favoriteDates', deleteFrom.favoriteDates.clean());
          //returns the state
          return cleanFrom;
      } else {
        const index = state.favoriteDates.length;
        const newData = {
          name: action.name,
          date: action.date,
          goal: action.goal,
        }
        return assocIn(state, ['favoriteDates', [index]], newData );
      }

    default:
      return state;
  }
};

Array.prototype.clean = function() {
  let arr = this;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == undefined || arr[i] == null) {
      arr = splice(arr, i, 1);
      i--;
    }
  }
  return arr;
};
