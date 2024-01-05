import { ScrollView, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { NowAccount } from "../../stores/app";
import SecurityComponent from "./components/security-password";
import Navbar from "../../components/navbar";
import { readAccount } from "../../lib/account";
import { scale } from "react-native-size-matters/extend";
type Props = StackScreenProps<RootStackParamList, 'Unlock'>;

const UnlockScreen = ({ navigation }: Props) => {
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [, setNowAccount] = useRecoilState(NowAccount);
    useEffect(() => {
        // (async () => {
        //     const oneWallet = await readAccount('147258');
        //     setNowAccount(oneWallet);
        //     globalThis.wallet = oneWallet;
        //     console.log('oneWallet', oneWallet.address);
        //     navigation.popToTop();
        //     navigation.replace('AuthStackNav');
        // })();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Navbar title="解锁" />
            </View>
            <ScrollView style={styles.inputContainer} keyboardShouldPersistTaps="handled">
                <SecurityComponent
                    onChange={(v) => {
                        setPassword(v);
                    }} onNext={async () => {
                        if (loading) {
                            return;
                        }
                        setLoading(true);
                        try {
                            console.log('password', password);
                            const oneWallet = await readAccount(password);
                            setNowAccount(oneWallet);
                            globalThis.wallet = oneWallet;
                            navigation.popToTop();
                            navigation.replace('AuthStackNav');
                        } catch (error) {

                        } finally {
                            setLoading(false);
                        }
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default UnlockScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputContainer: {
        flex: 1,
        paddingHorizontal: scale(15),
    }
})