import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
    container: {
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
        margin:2,
        height: 200,
        resizeMode: 'contain'
    },
    rightContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
