import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { navigate } from "../../../lib/root-navigation";

export default () => {
    return <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            navigate('AddFriend');
        }}>
            <Text style={styles.text}>添加好友</Text>
        </TouchableOpacity>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 15,
        fontWeight:'400',
        color:'#000000'
    }
});