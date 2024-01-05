import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters/extend";
import { Image } from "@/components/image";
export interface InputAccessoryItemType {
    title: string;
    icon: string;
    key: string;
}
export interface InputToolsProps {
    tools: InputAccessoryItemType[];
    onPress: (tool: InputAccessoryItemType) => void;
    height: number;
}
export default (props: InputToolsProps) => {
    const { tools, onPress, height } = props;
    return <View style={[styles.container, {
        height,
    }]}>
        {tools.map((tool, i) => {
            return <TouchableOpacity onPress={() => onPress(tool)} key={tool.key} style={{
                ...styles.item,
                marginTop: i > 3 ? 10 : 0,
            }}>
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={tool.icon} />
                </View>
                <Text style={styles.title}>{tool.title}</Text>
            </TouchableOpacity>
        })}
    </View>
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        width: '25%',
        alignItems: 'center',
    },
    iconContainer: {
        width: scale(50),
        height: scale(50),
        backgroundColor: 'white',
        borderRadius: scale(10),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: scale(46),
        height: scale(46),
    },
    title: {
        color: '#52525b',
        fontSize: scale(12),
        marginTop: scale(4),
        textAlign: 'center',
        marginVertical: verticalScale(5),
    }
});