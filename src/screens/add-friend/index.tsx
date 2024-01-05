import { Keyboard, ScrollView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useEffect, useRef, useState } from "react";
import FriendApi, { RelationListItem } from "../../api/friend";
import Navbar from "../../components/navbar";
import { scale } from "react-native-size-matters/extend";
import NavbarRight from "./components/navbar-right";
import ScanQrcodeModal, { ScanQrcodeModalType } from "../../components/scan-qrcode-modal";
import SearchInput from "./components/search-input";
import UserItem from "./components/user-item";
import toast from "../../lib/toast";

const AddFriendScreen = () => {
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<RelationListItem[]>([]);

    const search = useCallback((v: string, l: boolean) => {
        if (!v.match(/^0x[a-fA-F0-9]{40}$/)) {
            toast('请输入正确的以太坊地址！');
            return;
        }
        if (l) {
            return;
        }
        setLoading(true);
        FriendApi.relationList([v.toLowerCase()]).then((res) => {
            setUsers(res.items);
        }).catch((err) => {
            console.log('err', err)
        }).finally(() => setLoading(false));
    }, [])
    useEffect(() => {
        //inputRef.current?.focus();
    }, [])
    const modalRef = useRef<ScanQrcodeModalType>(null);
    return (
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
            <View style={{
                ...styles.container,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}>
                <View>
                    <Navbar title="添加好友" renderRight={() => <NavbarRight onPress={() => {
                        modalRef.current?.open();
                    }} />} />
                </View>
                <View style={styles.searchContainer}>
                    <SearchInput onSearch={(v) => {
                        search(v, loading);
                    }} />
                </View>
                <ScrollView style={styles.contentContainer}>
                    {users.map((item, i) => <UserItem isLast={i == (users.length - 1)} item={item} key={i} />)}
                </ScrollView>
                <ScanQrcodeModal onScan={(v) => {
                    search(v, loading);
                }} ref={modalRef} />
            </View>
        </TouchableNativeFeedback>
    );
};

export default AddFriendScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: scale(15),
        marginTop: scale(10),
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: scale(15),
        paddingTop: scale(15),
    },
});