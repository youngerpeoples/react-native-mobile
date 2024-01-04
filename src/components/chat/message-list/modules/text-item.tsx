import colors from "@/config/colors";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native"
import { scale } from "react-native-size-matters/extend";

export default (props: {
    text?: string;
    isSelf: boolean;
}) => {
    return <View style={[
        styles.container,
        props.isSelf ? styles.selfContainer : styles.userContainer,
    ]}>
        <Text style={[
            styles.text,
            props.isSelf ? styles.selfText : styles.userText,
        ]}>{props.text}</Text>
    </View>
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: scale(15),
        paddingRight: scale(20),
        paddingTop: scale(15),
        paddingBottom: scale(13),
        borderRadius: scale(15),
    },
    selfContainer: {
        backgroundColor: colors.primary,
        borderTopRightRadius: scale(0),
    },
    userContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: scale(0),
    },
    text: {
        fontSize: scale(15),
        fontWeight: '400',
        lineHeight: 21,
    },
    selfText: {
        color: '#fff',
    },
    userText: {
        color: '#666',
    },
});