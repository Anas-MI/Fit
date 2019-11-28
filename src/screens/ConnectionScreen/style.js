import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.secondaryColor,
   },
   loginForm: {
     flex: 1,
      alignSelf: 'center',
      alignItems:'center',
      justifyContent:'center',
   },
   spinner: {
     marginTop: 100
   },
   text: {
     paddingVertical: 50,
     textAlign: 'center',
     color: colors.defaultColor,
     fontSize: 18
   },
   icon: {
     width: 100,
     height: 100
   },
 });
