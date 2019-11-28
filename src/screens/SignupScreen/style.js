import {StyleSheet} from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: colors.secondaryColor,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryColor,
    borderWidth: 0.5,
    borderColor: colors.defaultColor,
    marginVertical: 5,
  },
  logo: {
    width: '100%',
    height: 100,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  searchIcon: {
    padding: 10,
    color: 'black',
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    height: 44,
  },
  signupText: {
    marginBottom: 20,
    width: '100%',
    textAlign: 'left',
    marginTop: 0,
    color: colors.defaultColor,
  },
});
