import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { navigate } from '@/lib/root-navigation';
import { scale } from "react-native-size-matters/extend";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { FriendListItem } from "@/api/friend";
import { Image } from "@/components/image";
dayjs.extend(relativeTime)
export default (props: {
    item:FriendListItem,
    isLast: boolean,
}) => {
    const { item, isLast } = props;
    return <TouchableOpacity onPress={() => {
        navigate('UserChat',{
            chatId: item.chat_id,
            uid: item.uid,
        })
    }} style={styles.container}>
        <View style={styles.avatarContainer}>
            <Image source={item.avatar} style={styles.avatar} />
        </View>
        <View style={{
            ...styles.rightContainer,
            borderBottomColor: isLast ? 'white' : '#F4F4F4',
        }}>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{!item?.remark ? item.name : item.remark}</Text>
            </View>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        height: scale(76),
        width: '100%',
        paddingHorizontal: scale(16),
        display: 'flex',
        flexDirection: 'row',
    },
    avatarContainer: {
        width: scale(57),
        height: scale(76),
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        marginRight: scale(10),
        borderWidth: 1,
        borderColor: '#F0F0F0'
    },
    rightContainer: {
        width: scale(260),
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    nameContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    nameText: {
        fontWeight: '400',
        fontSize: 16,
        color: '#333'
    },
});