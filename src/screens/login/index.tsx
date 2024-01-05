import { Keyboard, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import PagerView from "react-native-pager-view";
import { useRecoilState } from "recoil";
import { NowAccount } from "../../stores/app";
import UserApi from "../../api/user";
import AuthApi from "../../api/auth";
import Navbar from "../../components/navbar";
import toast from "../../lib/toast";
import { ScrollView } from "react-native";
import SetMnemonicWordComponent from "./components/set-mnemonic-word";
import SetPasswordComponent from "./components/set-password";
import { deleteAccount, writeAccount } from "../../lib/account";
import ToastException from "../../exception/toast-exception";
type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
    const [pageIndex, setPageIndex] = useState<number>(0);
    const pagerViewRef = useRef<PagerView>(null);
    const [mnemonicWord, setMnemonicWord] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [nowAccount, setNowAccount] = useRecoilState(NowAccount)
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });
        const hideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });
        return () => {
            showListener.remove();
            hideListener.remove();
        }
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Navbar title="登陆" />
            </View>
            <View style={styles.contentContainer}>
                <PagerView onPageSelected={(e) => {
                    setPageIndex(e.nativeEvent.position);
                }} ref={pagerViewRef} style={styles.pageContainer} initialPage={pageIndex} scrollEnabled={false}>
                    <ScrollView key="1" style={styles.pageItem} contentContainerStyle={{ paddingBottom: keyboardHeight }} keyboardShouldPersistTaps="handled">
                        <SetMnemonicWordComponent onChange={(v) => {
                            setMnemonicWord(v)
                        }} onNext={() => {
                            if (!bip39.validateMnemonic(mnemonicWord, wordlist)) {
                                throw new ToastException('助记词不合法，请检查！');
                            }
                            pagerViewRef.current?.setPage(1)
                        }} />
                    </ScrollView>
                    <ScrollView key="2" style={styles.pageItem} contentContainerStyle={{ paddingBottom: keyboardHeight }} keyboardShouldPersistTaps="handled">
                        <SetPasswordComponent pageIndex={pageIndex} onChange={(v) => {
                            setPassword(v);
                        }} onPrev={() => pagerViewRef.current?.setPage(0)} onNext={async () => {
                            if (loading) {
                                return;
                            }
                            setLoading(true);
                            try {
                                const oneWallet = await writeAccount(password, mnemonicWord);
                                setNowAccount(oneWallet);
                                globalThis.wallet = oneWallet;
                                const res = await UserApi.isRegister();
                                if (!res.is_register) {
                                    await AuthApi.register()
                                    await UserApi.updateName('新用户');
                                }
                                navigation.navigate('AuthStackNav');
                            } catch (e: any) {
                                if (e?.name === 'ToastException') {
                                    console.log('ToastException',e);
                                } else {
                                    toast('登陆失败，请重试');
                                }
                                if(nowAccount){
                                    setNowAccount(null);
                                    globalThis.wallet = null;
                                    deleteAccount(password);
                                }
                                return;
                            } finally {
                                setLoading(false);
                            }
                        }} />
                    </ScrollView>
                </PagerView>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
    },
    pageContainer: {
        flex: 1,
    },
    pageItem: {
        flex: 1,
    }
})