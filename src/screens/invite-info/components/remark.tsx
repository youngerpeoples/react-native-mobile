import { StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters/extend";

export default (props:{
    content:string;
}) => {
    return <View style={styles.container}>
        <Text style={styles.text}>{props.content}</Text>
    </View>
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#F4F4F4',
        backgroundColor: '#F8F8F8',
        width: '100%',
        borderRadius: verticalScale(16),
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(17),
        marginTop: verticalScale(10),
    },
    text:{
        fontSize: 16,
        color: '#333'
    }
});