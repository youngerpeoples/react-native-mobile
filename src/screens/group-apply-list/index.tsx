import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Navbar from "../../components/navbar";
type Props = StackScreenProps<RootStackParamList, 'GroupApplyList'>;
const GroupApplyListScreen = ({navigation }: Props) => {
    const insets = useSafeAreaInsets();
    // 与新朋友列表一样
    return (
        <View style={{
            ...styles.container,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }}>
            <View>
                <Navbar title="群申请" />
            </View>
            <View style={styles.listContainer}>
            </View>
        </View>
    );
};

export default GroupApplyListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
            backgroundColor: 'white',
    },
    listContainer: {
        flex: 1,
        width: '100%' 
    }
})