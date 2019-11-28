import {StyleSheet} from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  loginbutton: {
    backgroundColor: colors.defaultColor,
    height: 40,
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loginText: {
    color: colors.secondaryColor,
  },
});
