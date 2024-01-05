import { Pressable, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters/extend";
import toast from "../../../lib/toast";
import * as clipboard from 'expo-clipboard';
import { navigate } from "../../../lib/root-navigation";
import { Image } from "expo-image";
export default () => {
    const avatar = 'https://img2.woyaogexing.com/2023/11/17/171ab55d7ee543be461803d1fc941f3e.jpg';
    return <View style={styles.container}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.infoContainer}>
            <Text style={styles.name}>xxx</Text>
            <Pressable style={styles.uidContainer} onPress={async () => {
                if (await clipboard.setStringAsync('0x9999...dada')) {
                    toast('复制成功');
                }
            }}>
                <Text style={styles.uid}>BID: 0x9999...dada</Text>
            </Pressable>
        </View>
        <Pressable onPress={() => {
            navigate('UserCard');
        }}>
            <Image style={styles.qrcode} source={require('../../../assets/icons/qrcode.svg')} />
        </Pressable>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: verticalScale(59),
        paddingLeft: scale(27),
        paddingRight: scale(40),
        height: scale(50)
    },
    infoContainer: {
        flex: 1,
        height: 50,
        paddingLeft: scale(10),
        display: 'flex',
        justifyContent: "flex-start",
    },
    uidContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scale(6),
    },
    uid: {
        color: '#999',
        fontSize: 12,
    },
    name: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    avatar: {
        width: scale(48),
        height: scale(48),
        borderRadius: scale(24),
        borderWidth: scale(1),
        borderColor: '#F0F0F0',
    },
    qrcode: {
        width: scale(42),
        height: scale(42),
    }
});