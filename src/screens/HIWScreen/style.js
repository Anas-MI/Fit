import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
    container: {
      backgroundColor: colors.secondaryColor,
      flex: 1
    },
    innerView: {
      padding: 10
    },
    title: {
      fontSize: 22,
      color: colors.defaultColor,
      fontWeight: 'bold',
    },
    description: {
      color: colors.defaultColor,
      marginTop: 10,
      fontSize: 15,
    },
    containerContent: {
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
        margin: 2,
        height: 200,
        resizeMode: 'contain'
    },
    rightContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainer: {
        borderRadius: 2,
        backgroundColor: 'green',
        paddingVertical: 5,
        width: "100%",
        marginHorizontal: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
});
