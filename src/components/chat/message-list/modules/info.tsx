import { StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters/extend";

export default (props: {
    time?: string;
    name?: string;
    isSelf: boolean;
}) => {
    return <View style={[
        styles.container,
        props.isSelf ? styles.selfContainer : null,
    ]}>
        <Text style={[
            { marginRight: scale(10) },
            props.isSelf ? styles.time : styles.name,
        ]}>{props.isSelf ? props.time : props.name}</Text>
        <Text style={!props.isSelf ? styles.time : styles.name}>{!props.isSelf ? props.time : props.name}</Text>
    </View>
}
const styles = StyleSheet.create({
    container: {
        height: scale(30),
        flex: 1,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    selfContainer: {
        justifyContent: 'flex-end',
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    time: {
        fontSize: scale(12),
        fontWeight: '400',
        color: '#999',
    },
}); 