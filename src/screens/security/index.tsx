import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useRef } from "react";
import Navbar from "../../components/navbar";
import ConfirmModal, { ConfirmModalType } from "../../components/confirm-modal";
import ConfirmPasswordModal, { ConfirmPasswordModalType } from "../../components/confirm-password-modal";
import { scale, verticalScale } from "react-native-size-matters/extend";

import ToolItem from "./components/tool-item";
import { clearAccountDataList } from "../../lib/account";
import groupService from "../../service/group.service";
import messageService from "../../service/message.service";
import RNRestart from 'react-native-restart';
const SecurityScreen = () => {
    const insets = useSafeAreaInsets();
    const confirmModalRef = useRef<ConfirmModalType>();
    const confirmPasswordModalRef = useRef<ConfirmPasswordModalType>();
    const handleReset = useCallback(() => {
        clearAccountDataList();
        RNRestart.Restart();
    }, []);
    const options = [
        {
            icon: require('../../assets/icons/disk.svg'),
            title: '备份助记词',
            onPress: () => {
                //groupService.create('测试群聊', 'https://avatars.githubusercontent.com/u/25190530?s=60&v=4');
                const gid = '05df14c0-2b87-4dea-be20-aff84f7fb631';
                groupService.applyList().then((res,) => {
                    console.log('待审核',res);
                });
                // groupService.getInfo(gid).then((x) => {
                //     console.log('x', x);
                //     groupService.encInfo(gid).then((y) => {
                //         if (!globalThis.wallet || !x) {
                //             return;
                //         }
                //         const sharedSecret = globalThis.wallet.signingKey.computeSharedSecret(Buffer.from(x.pub.substring(2), 'hex')).substring(4);
                //         console.log('sharedSecret', sharedSecret);
                //         const pri = quickAes.De(y.enc_pri, sharedSecret);
                //         const key = quickAes.De(y.enc_key, sharedSecret);
                //         console.log('pri', pri);
                //         console.log('key', key);
                //     });
                // });
                // confirmPasswordModalRef.current?.open({
                //     title: '备份助记词',
                //     desc: '请谨慎操作！',
                //     onSubmit: (password: string) => {

                //         readMN(password).then((mn) => {
                //             console.log(mn)
                //             navigate('BackupMnemonic', { mn })
                //         }).catch((e) => {
                //         });
                //     }
                // })
            }
        },
        {
            icon: require('../../assets/icons/logout.svg'),
            title: '退出所有群聊',
            onPress: () => {
                confirmModalRef.current?.open({
                    title: '清空所有消息',
                    desc: '清空所有消息后，将无法恢复',
                    onSubmit: () => {
                        groupService.quitAll();
                    }
                })
            }
        },
        {
            icon: require('../../assets/icons/destory.svg'),
            title: '清空所有消息',
            onPress: () => {
                confirmModalRef.current?.open({
                    title: '清空所有消息',
                    desc: '清空所有消息后，将无法恢复',
                    onSubmit: () => {
                        messageService.clearAll();
                    }
                })
            }
        },
        {
            icon: require('../../assets/icons/userdel.svg'),
            title: '删除所有好友',
            onPress: () => {
                confirmModalRef.current?.open({
                    title: '删除所有好友',
                    desc: '删除所有好友后，将无法恢复'
                })
            }
        },
        {
            icon: require('../../assets/icons/reset.svg'),
            title: '重置应用',
            onPress: () => {
                confirmModalRef.current?.open({
                    title: '重置应用',
                    desc: '将清除应用所有数据',
                    onSubmit: () => {
                        handleReset();
                    }
                })
            }
        }
    ]
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }}>
            <View>
                <Navbar title="安全" />
            </View>
            <ScrollView style={{
                width: '100%',
                paddingHorizontal: scale(20),
                paddingTop: verticalScale(5)
            }}>
                {options.map((option, index) => <ToolItem item={option} key={index} />)}
            </ScrollView>
            <ConfirmModal ref={confirmModalRef} />
            <ConfirmPasswordModal ref={confirmPasswordModalRef} />
        </View>
    );
};

export default SecurityScreen;