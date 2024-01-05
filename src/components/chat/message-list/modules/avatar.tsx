import { Image } from "@/components/image";
import { Pressable, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters/extend";

export default (props: {
    uri?: string;
    isSelf: boolean;
    uid?: string;
}) => {
    return <Pressable onPress={() => {
        // 阻止事件冒泡
        console.log('avatar');
    }} style={[styles.container,props.isSelf ? styles.selfContainer : null]}>
        <Image source={props.uri} style={styles.avatar} />
    </Pressable>
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'flex-start',
        width: scale(56),
    },
    selfContainer: {
        alignItems: 'flex-end',
    },
    avatar: {
        width: scale(46),
        height: scale(46),
        borderRadius: scale(23),
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
});