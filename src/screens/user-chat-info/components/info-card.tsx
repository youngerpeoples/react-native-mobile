import { StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters/extend";
import { Image } from "@/components/image";
import { TouchableOpacity } from "react-native-gesture-handler";



export default (props: {
    avatar: string;
    name: string;
}) => {
    return <View style={styles.container}>
        <View style={styles.avatarContainer}>
            <Image source={props.avatar} style={styles.avatar} />
            <Text numberOfLines={1} style={styles.name}>{props.name}</Text>
        </View>
        <TouchableOpacity>
            <Image source={require('@/assets/icons/circle-plus-big-white.svg')} style={styles.icon} />
        </TouchableOpacity>
    </View>
};
const styles = StyleSheet.create({
    container: {
        borderRadius: scale(16),
        borderWidth: 1,
        borderColor: '#F4F4F4',
        backgroundColor: '#F8F8F8',
        padding: scale(15),
        display: 'flex',
        flexDirection: 'row',
    },
    avatarContainer: {
        width: scale(50),
        marginRight: scale(20),
    },
    avatar: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    name: {
        textAlign: 'center',
                marginTop: scale(7),
    },
    icon: {
        width: scale(50),
        height: scale(50),
    },
});