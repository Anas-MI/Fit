import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  headingText: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.defaultColor,
  },
  textContent: {
    fontSize: 15,
  },
  logo: {
    width: "100%",
    height: 50,
    marginVertical: 5,
    resizeMode: 'contain'
  },
});
