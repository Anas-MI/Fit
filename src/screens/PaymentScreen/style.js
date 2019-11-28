import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.secondaryColor,
      justifyContent: 'center'
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
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      height: 44,
  },
  searchIcon: {
      padding: 10,
      color: 'black',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
   },
  modalSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryColor,
    borderWidth: 0.5,
    borderColor: colors.defaultColor,
    marginVertical: 5,
    margin: 10
  },
});
