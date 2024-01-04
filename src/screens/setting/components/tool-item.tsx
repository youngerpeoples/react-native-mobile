import { Image } from "expo-image"
import React from "react";
import { Pressable, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity } from "react-native"
import { scale, verticalScale } from "react-native-size-matters/extend"

export default (props: {
    title: string;
    icon: any;
    onPress?: () => void;
    rightComponent?: () => React.ReactNode;
}) => {
    return <Pressable onPress={props.onPress} style={styles.container}>
        <Image source={props.icon} style={styles.icon} />
        <Text style={styles.title}>{props.title}</Text>
        {props.rightComponent ? props.rightComponent() : <Image style={styles.rightIcon} source={require('../../../assets/icons/arrow-right-gray.svg')} />}
    </Pressable>
}
const styles = StyleSheet.create({
    container: {
        height: verticalScale(58),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        width: scale(32),
        height: scale(32),
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: '#52525b',
    },
    rightIcon: {
        width: scale(20),
        height: scale(20),
    }
});