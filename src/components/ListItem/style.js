import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginBottom: 0,
    backgroundColor: colors.white,
    height: 'auto',
    padding:15,
    borderRadius: 2,
  },
  image: {
    width: '100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 2,
    height: 200,
  },
  badge: {
    backgroundColor: 'red',
    padding:3,
    marginLeft: 'auto'
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 17
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    width: '100%'
  },
  buttonContainer: {
    borderRadius: 2,
    backgroundColor: 'green',
    paddingVertical: 5,
    width: "40%",
    marginHorizontal: 10,
  },
  rightContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
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
    alignItems: 'flex-start',
    backgroundColor: colors.secondaryColor,
    borderWidth: 0.5,
    borderColor: colors.defaultColor,
    marginVertical: 5,
    margin: 10
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      height: 44,
  },
});
