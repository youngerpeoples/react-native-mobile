import { StackScreenProps } from "@react-navigation/stack";
import { Keyboard, View, Platform, Pressable, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import Navbar from "@/components/navbar";
import tools from './tools';
type Props = StackScreenProps<RootStackParamList, 'UserChat'>;
import { UserInfo } from "@/api/user";
import friendService from "@/service/friend.service";
import userService from "@/service/user.service";
import MessageService from "@/service/message.service";
import ToastException from "@/exception/toast-exception";
import { FriendListItem } from "@/api/friend";
import { scale, verticalScale } from "react-native-size-matters/extend";
import { TouchableOpacity } from "react-native";
import { Image } from "@/components/image";
import EncImagePreview, { IEncImagePreviewRef } from "@/components/chat/enc-image-preview-modal";
import EncFilePreview, { IEncFilePreviewRef } from "@/components/chat/enc-file-preview-modal";
import LoadingModal,{ILoadingModalRef} from "@/components/common/loading-modal";
import { RootStackParamList } from "@/types";
import InputToolkit, { InputToolKitRef } from "@/components/chat/input-toolkit";
import { DataType, IMessage, IMessageFile, IMessageImage, IMessageTypeMap } from "@/components/chat/input-toolkit/types";
import MessageList from "@/components/chat/message-list";
import { globalStorage } from "@/lib/storage";
const UserChatScreen = ({ navigation, route }: Props) => {
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState<IMessage<DataType>[]>([])

    const [keyboardHeight, setKeyboardHeight] = useState<number>(300);
    const [keyboardState, setKeyboardState] = useState(false);
    const conversationIdRef = useRef<string>('');
    const [title, setTitle] = useState<string>('');
    const [authUser, setAuthUser] = useState<UserInfo>();
    const [user, setUser] = useState<FriendListItem>();
    const sharedSecretRef = useRef<string>('');
    const firstSeq = useRef<number>(0);
    const lastSeq = useRef<number>(0);
    const loadingRef = useRef<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout>();
    const encImagePreviewRef = useRef<IEncImagePreviewRef>();
    const encFilePreviewRef = useRef<IEncFilePreviewRef>();
    const imagesRef = useRef<IMessageImage[]>([]);

    const listRef = useRef<FlashList<IMessage<DataType>>>();
    const loadingModalRef = useRef<ILoadingModalRef>();
    const inputToolkitRef = useRef<InputToolKitRef>(null);
    const loadMessages = useCallback((direction: 'up' | 'down') => {
        if (loadingRef.current) {
            return;
        }
        const seq = direction == 'up' ? firstSeq.current : lastSeq.current;
        MessageService.getList(conversationIdRef.current, sharedSecretRef.current, seq, direction).then((res) => {
            if (res.length > 0) {
                if (direction == 'up') {
                    firstSeq.current = res[res.length - 1].sequence ?? 0;
                    if (lastSeq.current == 0) {
                        lastSeq.current = res[0].sequence ?? 0;
                    }
                } else {
                    lastSeq.current = res[res.length - 1].sequence ?? 0;
                }
            }
            console.log('消息列表', res);
            setMessages((items) => {
                return res.concat(items);
            });
            // 存储图片
            const tmps: IMessageImage[] = [];
            res.forEach((item) => {
                if (item.type == 'image') {
                    tmps.push(item.data as IMessageImage)
                }
            });
            imagesRef.current = tmps.concat(imagesRef.current);
            console.log('图片列表', imagesRef.current);
        }).catch((err) => {
            console.log('err', err);
        }).finally(() => {
            loadingRef.current = false;
        })
    }, [])
    useEffect(() => {
        // 监听页面获取焦点
        const focusEvent = navigation.addListener('focus', () => {
            setMessages([]);
            imagesRef.current = [];
            conversationIdRef.current = route.params.chatId ?? '';
            //conversationIdRef.current = 's_e36812780132627e';
            console.log('会话id conversationIdRef', conversationIdRef.current)
            const uid = route.params.uid;//'0xb929da34c0791dff8541fc129c5b61323a996a7a';//
            if (!uid) {
                navigation.goBack();
                return;
            }
            friendService.getInfo(uid).then((res) => {
                console.log('好友信息', res);
                if (res && globalThis.wallet) {
                    let pubKey = res.pub_key;
                    sharedSecretRef.current = globalThis.wallet.signingKey.computeSharedSecret(pubKey);
                    setUser(res);
                    setTitle((res?.remark ?? '') || res.name);
                    loadMessages('up');
                    intervalRef.current = setInterval(() => {
                        loadMessages('down');
                    }, 2000);
                }
            })
        });
        const blurEvent = navigation.addListener('blur', () => {
            setMessages([]);
            firstSeq.current = 0;
            lastSeq.current = 0;
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        });
        return () => {
            focusEvent();
            blurEvent();
        }
    }, [navigation])

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            setKeyboardHeight(e.endCoordinates.height)
            globalStorage.setItem('keyboardHeight', e.endCoordinates.height);
            setKeyboardState(true);
        }
        );
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardState(false);
        });
        if (globalThis.wallet) {
            userService.getInfo(globalThis.wallet.address.toLowerCase()).then((res) => {
                if (res) {
                    setAuthUser(res);
                }
            })
        }

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [])
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                paddingTop: insets.top,
                paddingBottom: keyboardState ? (Platform.OS == 'ios' ? keyboardHeight : 0) : 0,
            }}>
            <View style={{
                height: 40,
                width: '100%',
                backgroundColor: 'white',
            }}>
                <Navbar title={title} renderRight={() => {
                    return <View style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={() => {
                            console.log('点击', imagesRef.current);
                            // navigation.navigate('UserChatInfo', {
                            //     uid: user?.uid ?? '',
                            //     chatId: conversationIdRef.current,
                            //     avatar: user?.avatar ?? '',
                            //     name: user?.remark ?? user?.name ?? '',
                            //     disturb: false,
                            //     top: false,
                            // })
                        }}>
                            <Image source={require('@/assets/icons/more.svg')} style={{
                                width: scale(32),
                                height: scale(32),
                            }} />
                        </TouchableOpacity>

                    </View>
                }} />
            </View>
            <View style={{
                flex: 1,
                backgroundColor: '#F4F4F4',
            }}>
                <TouchableWithoutFeedback accessible={false} onPress={() => {
                    Keyboard.dismiss();
                    inputToolkitRef.current?.down();
                }}>
                <View style={{
                    flex: 1,
                    width: '100%',
                    paddingBottom: keyboardState ? verticalScale(60) : (verticalScale(60) + insets.bottom),
                }}>
                    <MessageList authUid={authUser?.id ?? ''} encKey={sharedSecretRef.current} messages={messages} onLongPress={(m)=>{
                        console.log('长按',m);
                    }} onPress={(m) => {
                        const data = m.data as IMessageTypeMap[DataType];
                        if (m.type == 'image') {
                            console.log('点击图片', m);
                            const data = m.data as IMessageImage;
                            const initialIndex = imagesRef.current.findIndex((image) => image.original == data.original)
                            if (m.state == 1) {
                                encImagePreviewRef.current?.open({
                                    encKey: sharedSecretRef.current,
                                    images: imagesRef.current,
                                    initialIndex,
                                })
                            }
                        }
                        if (m.type == 'file') {
                            if (m.data && m.state == 1) {
                                encFilePreviewRef.current?.open({
                                    encKey: sharedSecretRef.current,
                                    file: m.data as IMessageFile,
                                })
                            }
                        }
                    }}/>
                </View>

                    
                </TouchableWithoutFeedback>
            </View>
            <View
                style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: keyboardState ? (Platform.OS == 'ios' ? keyboardHeight : 0) : 0,
                }}>
                <InputToolkit ref={inputToolkitRef} onSend={async (message) => {
                    console.log('发送消息@@@@@@@', message);
                    if (!user) {
                        throw new ToastException('信息错误！');
                    }
                    setMessages((items) => {
                        return [{ ...message, user: authUser } as IMessage<DataType>].concat(items);
                    });
                    setTimeout(() => {
                        if(message.type == 'image' || message.type =="file"){
                            loadingModalRef.current?.open('加密处理中...');
                        }
                        MessageService.send(conversationIdRef.current, sharedSecretRef.current, message).then((res) => {
                            if (!res) {
                                return;
                            }
                            // 将消息状态改为已发送
                            const { sequence = 0 } = res;
                            if (sequence > lastSeq.current) {
                                lastSeq.current = sequence;
                            }
                            setMessages((items) => {
                                const index = items.findIndex((item) => item.mid == message.mid);
                                if (index > -1) {
                                    items[index].state = 1;
                                    items[index].sequence = sequence;
                                    if (message.type == 'image') {
                                        items[index].data = res.data as IMessageImage;
                                        imagesRef.current.push(res.data as IMessageImage);
                                    } else if (message.type == 'file') {
                                        const data = res.data as IMessageFile;
                                        message.data = {
                                            ...data,
                                            path: data.path,
                                        };
                                        const file = message.data;
                                        if (file) {
                                            file.path = data.path;
                                            items[index].data = file;
                                        }

                                    }
                                }
                                return items;
                            });
                        }).catch((err) => {
                            // 将消息状态改为发送失败
                            console.log('发送失败', err);
                            setMessages((items) => {
                                const index = items.findIndex((item) => item.mid == message.mid);
                                if (index > -1) {
                                    items[index].state = 2;
                                }
                                return items;
                            });
                        }).finally(() => {
                            loadingModalRef.current?.close();
                        })
                    }, 100)

                }} tools={tools} />
            </View>
            <EncImagePreview ref={encImagePreviewRef} />
            <EncFilePreview ref={encFilePreviewRef} />
            <LoadingModal ref={loadingModalRef}/>
        </View>

    )
}
export default UserChatScreen;