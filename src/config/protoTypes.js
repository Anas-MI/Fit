import {splice} from 'icepick';

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
