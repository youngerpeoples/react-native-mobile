import { StyleSheet, View } from "react-native";
import { Text } from "react-native"
import { scale } from "react-native-size-matters/extend";

export default (props: {
    name: string;
    isSelf: boolean;
}) => {
    return <View style={[
        styles.container,
        props.isSelf ? styles.selfContainer : styles.userContainer,
    ]}>
        <Text numberOfLines={2} style={styles.text}>{props.name}</Text>
    </View>
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: scale(15),
        paddingRight: scale(20),
        paddingTop: scale(15),
        paddingBottom: scale(13),
        borderRadius: scale(15),
        backgroundColor: '#ffffff',
    },
    selfContainer: {
        borderTopRightRadius: scale(0),
    },
    userContainer: {
        borderTopLeftRadius: scale(0),
    },
    text: {
        fontSize: scale(15),
        fontWeight: '400',
        lineHeight: 21,
        color: '#666',
    },
});