import GenderIcon from "@/components/gender-icon";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { scale, verticalScale } from "react-native-size-matters/extend"


export default (props: {
    onChange: (v: number) => void
}) => {
    const [options, _] = useState<{
        title: string;
        value: number;
    }[]>([
        {
            title: '保密',
            value: 2
        },
        {
            title: '男',
            value: 1
        },
        {
            title: '女',
            value: 0
        },
    ]);
    const [value, setValue] = useState(2);
    return <View style={styles.container}>
        {options.map((option, index) => {
            return <TouchableOpacity onPress={() => {
                props.onChange(option.value)
                if (value === option.value) return;
                setValue(option.value)
            }} key={index} style={styles.item}>
                <GenderIcon style={styles.leftIcon} name={option.value}/>
                <Text style={styles.title}>{option.title}</Text>
                <View style={styles.rightContainer}>
                    {option.value == value ? <Image style={styles.rightIcon} source={require('@/assets/icons/circle-checked.svg')} /> : null}
                </View>
            </TouchableOpacity>
        })}
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        height: verticalScale(42),
        borderRadius: scale(21),
        backgroundColor: '#F3F3F3',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F4F4F4',
        paddingHorizontal: scale(15),
    },
    title: {
        fontSize: scale(14),
        fontWeight: '400',
        color: '#333',
        marginRight: scale(10),
    },
    leftIcon: {
        width: scale(15),
        height: scale(15),
        marginRight: scale(5),
    },
    rightContainer: {
        width: scale(15),
    },
    rightIcon: {
        width: scale(15),
        height: scale(15),
    }
})