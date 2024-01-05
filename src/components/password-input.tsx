import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { scale } from "react-native-size-matters/extend";
export interface PasswordInputType {
    init: () => void;
}
export default forwardRef((props: {
    onChange: (val: string) => void;
    onReady?: (val: boolean) => void;
}, ref) => {

    const [words, setWords] = useState<string[]>(new Array(6).fill(''));
    const inputRefs = useRef<TextInput[]>([]);
    const [focusStates, setFocusStates] = useState<boolean[]>(new Array(6).fill(false));
    useImperativeHandle(ref, () => ({
        init: async () => {
            setWords(new Array(6).fill(''));
            inputRefs.current[0].focus();
        }
    }));
    return <View style={styles.wordContainer}>
        {words.map((word, i) => {
            return (
                <View key={i} style={styles.wordItem}>
                    <TextInput
                        secureTextEntry={true}
                        onFocus={() => {
                            const tmps = [...focusStates];
                            tmps[i] = true;
                            setFocusStates(tmps);
                        }}
                        onBlur={() => {
                            const tmps = [...focusStates];
                            tmps[i] = false;
                            setFocusStates(tmps);
                        }}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace') {
                                if (i > 0) {
                                    const tmps = [...words];
                                    if (tmps[i] === '') {
                                        tmps[i - 1] = '';
                                        let tmpReady = true;
                                        tmps.forEach((tmp) => {
                                            if (tmp === '') {
                                                tmpReady = false;
                                            }
                                        });
                                        props.onReady && props.onReady(tmpReady);
                                        setWords(tmps);
                                        inputRefs.current[i - 1].focus();
                                        if (tmpReady) {
                                            Keyboard.dismiss();
                                        }
                                    }
                                }
                            } else {
                                if (i < words.length - 1) {
                                    inputRefs.current[i + 1].focus();
                                }
                            }
                        }}
                        maxLength={1}
                        ref={(ref) => {
                            inputRefs.current[i] = ref as TextInput;
                        }}
                        keyboardType="number-pad"
                        style={styles.wordInput}
                        onChangeText={(v) => {
                            const tmps = [...words];
                            tmps[i] = v.replace(/[^0-9]/g, '');
                            let tmpReady = true;
                            tmps.forEach((tmp) => {
                                if (tmp === '') {
                                    tmpReady = false;
                                }
                            });
                            props.onReady && props.onReady(tmpReady);
                            setWords(tmps);
                            if (!/^\d$/.test(v)) {
                                return;
                            }
                            if (v !== '') {
                                if (i < words.length - 1) {
                                    inputRefs.current[i + 1].focus();
                                }
                            } else {
                                if (i > 0) {
                                    inputRefs.current[i - 1].focus();
                                }
                            }
                            if (tmpReady) {
                                Keyboard.dismiss();
                            }
                            props.onChange(tmps.join(''));
                        }}
                        value={word}
                    />
                </View>
            )
        })}
    </View>;
})
const styles = StyleSheet.create({
    wordContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    wordItem: {
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderColor: '#B7C0CB',
        width: scale(45),
        height: scale(45),
        borderRadius: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    wordInput: {
        width: scale(45),
        color: '#000',
        fontSize: scale(28),
        padding: 0,
        margin: 0,
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: '500',
    },
})