import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters/extend";
import { Image } from "expo-image";
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(60),
        backgroundColor: 'white',
        flexDirection: 'row',
        borderTopWidth: scale(1),
        borderTopColor: '#A0A0A01a',
    },
    tabItem: {
        flex: 1,
        height: verticalScale(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default (props: BottomTabBarProps) => {
    const { state, descriptors, navigation } = props;

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}
                        key={index}
                    >
                        <View>
                            {route.name == 'UserCenter' ? <Image style={{
                                width: scale(25),
                                height: scale(25),
                            }} source={isFocused ? require('../assets/icons/user-selected.svg') : require('../assets/icons/user.svg')} /> : null}
                            {route.name == 'Contact' ? <Image style={{
                                width: scale(75),
                                height: scale(60),
                            }} source={isFocused ? require('../assets/icons/contact-selected.svg') : require('../assets/icons/contact.svg')} /> : null}
                            {route.name == 'Home' ? <Image style={{
                                width: scale(24),
                                height: scale(24),
                            }} source={isFocused ? require('../assets/icons/conversation-selected.svg') : require('../assets/icons/conversation.svg')} /> : null}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}