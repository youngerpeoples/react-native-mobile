import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native"
import { scale } from "react-native-size-matters/extend";
export default (props: {
    onPress: () => void;
}) => {
    return <Pressable style={styles.container} onPress={props.onPress}>
        <Image style={styles.icon} source={require('../../../assets/icons/circle-plus.svg')} />
    </Pressable>
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    icon: {
        width: scale(30),
        height: scale(30),
        marginRight: scale(16),
    }
});