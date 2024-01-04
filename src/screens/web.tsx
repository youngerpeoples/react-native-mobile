import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/navbar";

type Props = StackScreenProps<RootStackParamList, 'Web'>;
const WebScreen = ({ route }: Props) => {
    const {title='', url} = route.params
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Navbar title={title}/>
            </View>
            <WebView style={styles.webContainer} source={{ uri: url ?? 'https://baidu.com' }} />
        </SafeAreaView>
    );
};

export default WebScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    webContainer: {
        flex: 1,
        width: '100%',
    },
})