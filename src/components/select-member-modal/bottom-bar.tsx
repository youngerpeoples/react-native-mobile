import { StyleSheet, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters/extend";
import { Button, Checkbox } from "react-native-ui-lib";
import colors from "@/config/colors";

export default (props: {
    onConfirm: () => void;
    checkedAll: boolean;
    onCheckedAllChange: (value: boolean) => void;
}) => {
    return <View style={styles.container}>
        <Checkbox borderRadius={scale(11)} color={colors.primary} iconColor="white" size={scale(22)} value={props.checkedAll} onValueChange={(value) => props.onCheckedAllChange(value)} />
        <Button size="small" style={styles.button} backgroundColor={colors.primary} label="完成" onPress={() => props.onConfirm()} labelStyle={styles.buttonLabel} />
    </View>
}
const styles = StyleSheet.create({
    container: {
        height: verticalScale(60),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scale(15),
    },
    button: {
        height: verticalScale(40),
        borderRadius: scale(10),
        paddingHorizontal: scale(22),
    },
    buttonLabel: {
        fontSize: scale(14),
        fontWeight: '500',
    }
});