import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters/extend";
export interface DropMenuItem {
    title: string;
    onPress: () => void;
    icon: any;
}
export default (props: {
    close: () => void;
    menus: DropMenuItem[];
}) => {
    const insets = useSafeAreaInsets();
    const {menus} = props;
    return <>
        <TouchableWithoutFeedback onPress={() => props.close()}>
            <View style={{
                ...styles.container,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}>
                <View style={styles.menuContainer}>
                    <View style={styles.iconTriangleContainer}>
                        <Image source={require('@/assets/icons/inverted-triangle.svg')} style={styles.iconTriangle} />
                    </View>
                    <View style={styles.menuBox}>
                        <View style={styles.menuIconBox}>
                            {menus.map((menu, index) => {
                                return <TouchableOpacity key={index} onPress={menu.onPress} style={styles.menuItemIconContainer}>
                                    <Image source={menu.icon} style={styles.menuItemIcon} />
                                </TouchableOpacity>
                            })}
                        </View>
                        <View>
                            {menus.map((menu, index) => {
                                const isLast = index === menus.length - 1;
                                return <TouchableOpacity key={index} onPress={() => {
                                    menu.onPress()
                                }} style={{
                                    ...styles.menuItemTextContainer,
                                    borderBottomColor: isLast ? '#f1f1f1' : 'rgba(101, 113, 126, 0.1)',
                                }}>
                                    <Text style={styles.menuItemText}>{menu.title}</Text>
                                </TouchableOpacity>
                            })}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </>
}

const styles = StyleSheet.create({
    container: {
        right: 0,
        top: 50,
        left: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 9999,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
    },
    menuBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    menuContainer: {
        backgroundColor: '#F1F1F1',
        position: 'relative',
        borderRadius: scale(8),
        left: 0,
        top: 0,
        paddingHorizontal: scale(12),
        marginRight: scale(10),
    },
    iconTriangleContainer: {
        position: 'absolute',
        top: verticalScale(-4),
        right: scale(11),
        height: scale(8),
        display: 'flex',
        alignItems: 'center',
    },
    iconTriangle: {
        width: scale(13),
        height: scale(8),
    },
    menuIconBox: {
        width: scale(24),
    },
    menuItemIconContainer: {
        height: scale(50),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemIcon: {
        width: scale(18),
        height: scale(18),
    },
    menuItemTextContainer: {
        height: scale(50),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: scale(1),
    },
    menuItemText: {
        color: '#333',
        fontSize: scale(14),
        fontWeight: '400',
    },
});