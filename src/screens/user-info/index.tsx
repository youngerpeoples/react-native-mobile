import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-ui-lib";
import Navbar from "@/components/navbar";
import friendApi, { RelationListItem } from "@/api/friend";
import { useEffect, useState } from "react";
import { scale, verticalScale } from "react-native-size-matters/extend";
import InfoCard from "./components/info-card";
import RemarkCard from "./components/remark-card";
import colors from "@/config/colors";
import { Image } from "@/components/image";
import { TouchableOpacity } from "react-native-gesture-handler";
type Props = StackScreenProps<RootStackParamList, 'UserInfo'>;

const UserInfoScreen = ({ navigation, route }: Props) => {
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState<RelationListItem>();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            friendApi.relationList([route.params?.uid ?? '0x1319b5152a93a33a8102241903da0097960e5c49']).then(res => {
                if (res.items.length > 0) {
                    setUser(res.items[0]);
                }
            })
        });
        return unsubscribe;
    }, [navigation])
    return (
        <View style={{
            ...styles.container,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }}>
            <View>
                <Navbar title="用户信息" renderRight={() => {
                    return <View style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Image source={require('@/assets/icons/more.svg')} style={{
                                width: scale(32),
                                height: scale(32),
                            }} />
                        </TouchableOpacity>

                    </View>
                }} />
            </View>
            {user ?
                <View style={{ flex: 1 }}>
                    <View style={{
                        paddingHorizontal: scale(15),
                        marginTop: verticalScale(20),
                    }}>
                        <InfoCard user={user} />
                    </View>
                    {user.is_friend != 1 ? null : <View style={{
                        paddingHorizontal: scale(15),
                        marginTop: verticalScale(21),
                    }}>
                        <RemarkCard remark="哈哈哈" />
                    </View>}
                    <View style={{
                        paddingHorizontal: scale(27),
                        alignItems: 'center',
                        marginTop: verticalScale(40),
                    }}>
                        <Button size="large" fullWidth={true} style={{
                            width: '100%',
                            height: verticalScale(50),
                            borderRadius: verticalScale(16),
                        }} backgroundColor={colors.primary} onPress={() => {
                            if (user.is_friend != 1) {
                                navigation.navigate('InviteFriend', {
                                    uid: user.uid
                                })
                            } else {
                                navigation.navigate('UserChat', {
                                    uid: user.uid,
                                    chatId: ''
                                })
                            }
                        }} label={user.is_friend != 1 ? '添加好友' : '开始聊天'} />
                    </View>
                </View> : null}

        </View>
    );
};

export default UserInfoScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});