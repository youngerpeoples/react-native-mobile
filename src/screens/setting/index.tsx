import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-ui-lib";
import { useRef } from "react";
import * as Application from 'expo-application';
import Navbar from "../../components/navbar";
import { scale } from "react-native-size-matters/extend";
import ActionSheet, { ActionSheetType } from "../../components/confirm-modal";
import { navigate } from "../../lib/root-navigation";
import { verticalScale } from "react-native-size-matters/extend";
import ToolItem from "./components/tool-item";
const SettingScreen = () => {
    const insets = useSafeAreaInsets();
    const version = Application.nativeApplicationVersion;
    const actionSheetRef = useRef<ActionSheetType>(null);
    return (
        <View style={{
            ...styles.container,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }}>
            <View>
                <Navbar title="设置" />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.toolContainer}>

                    <ToolItem title="关于我们" icon={require('../../assets/icons/info.svg')} onPress={() => {
                        navigate('Web', {
                            url: 'https://baidu.com',
                        })
                    }} />
                    <ToolItem title="注销账号" icon={require('../../assets/icons/power.svg')} onPress={() => {
                        actionSheetRef.current?.open({
                            title: '注销账号',
                            desc: '注销账号后，将无法恢复,并且将删除所有信息',
                            onSubmit: async () => {
                                navigate('Unlock');
                                // 输入密码后，删除账号
                            }
                        });
                    }} />
                    <ToolItem title="当前版本" icon={require('../../assets/icons/bookmark.svg')} rightComponent={() => {
                        return <View style={styles.versionContainer}>
                            <Text style={styles.version}>{version}</Text>
                        </View>
                    }} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button label="退出登录" size="large" style={styles.button} avoidMinWidth={true} outlineColor="#D90000" backgroundColor="white" onPress={async () => {
                        actionSheetRef.current?.open({
                            title: '退出登录',
                            desc: '退出登录后，将无法收到消息,但数据将保留',
                            onSubmit: async () => {
                                navigate('Unlock');
                            }
                        });
                    }} labelStyle={styles.buttonLabel} />
                </View>
            </View>
            <ActionSheet ref={actionSheetRef} />
        </View>
    );
};

export default SettingScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(46),
        display: 'flex',
        justifyContent: 'space-between',
    },
    toolContainer: {
        paddingHorizontal: scale(15),
    },
    buttonContainer: {
        paddingHorizontal: scale(25),
    },
    button: {
        height: scale(50),
        borderRadius: scale(12)

    },
    versionContainer: {
        width: scale(20),

    },
    version: {
        fontSize: 15,
        fontWeight: '400',
        color: '#666',
    },
    buttonLabel: {
        color: '#D90000',
    }
});