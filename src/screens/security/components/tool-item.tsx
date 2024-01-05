import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { scale, verticalScale } from "react-native-size-matters/extend"
export interface ToolItemType {
    icon: any;
    title: string;
    onPress: () => void;
}
export default (props: {
    item: ToolItemType
}) => {
    const { item } = props;
    return <TouchableOpacity style={styles.container} onPress={item.onPress}>
        <Image style={styles.leftIcon} source={item.icon} />
        <Text style={styles.text}>{item.title}</Text>
        <Image style={styles.rightIcon} source={require('../../../assets/icons/arrow-right-gray.svg')} />
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: verticalScale(58),
        borderRadius: verticalScale(14),
        backgroundColor: '#F9F9F9',
        marginTop: verticalScale(15),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(15)
    },
    leftIcon: {
        width: verticalScale(32),
        height: verticalScale(32),
    },
    text:{
        flex: 1,
        color: '#3A495A',
        fontSize: 14,
        fontWeight: '400'
    },
    rightIcon:{
        width: verticalScale(20),
        height: verticalScale(20),
    }
});