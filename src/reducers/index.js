import {combineReducers} from 'redux';
import {login} from './login';
import {signup} from './signup';
import {content} from './content';
import {forgot} from './forgot';
import {dateContent} from './dateContent';
import {testSubmit} from './testSubmit';
import favourites from './getFavourites';
import {settings} from './settings';
import {aboutUs} from './aboutUs';
import {howItWorks} from './howItWorks';
import workout from './workout';
import {fitGoals} from './fitGoals';

export default combineReducers({
  login,
  signup,
  content,
  forgot,
  fitGoals,
  dateContent,
  testSubmit,
  favourites,
  settings,
  aboutUs,
  howItWorks,
  workout,
});
