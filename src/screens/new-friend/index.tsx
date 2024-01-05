import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import Navbar from "@/components/navbar";
import NavbarRight from "./components/navbar-right";
import { scale } from "react-native-size-matters/extend";
import InviteItem from "./components/invite-item";
type Props = StackScreenProps<RootStackParamList, 'NewFriend'>;
import friendApi, { InviteListItem } from "@/api/friend";
import { RootStackParamList } from "@/types";

const NewFriendScreen = ({navigation }: Props) => {
    const insets = useSafeAreaInsets();
    const [items, setItems] = useState<InviteListItem[]>([]);
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            friendApi.getInviteList().then(res =>{
                setItems(res.items);
            })
        });
        return unsubscribe;
    },[navigation])
    return (
        <View style={{
            ...styles.container,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }}>
            <View>
                <Navbar renderRight={() => <NavbarRight/>} title="新的好友" />
            </View>
            <View style={styles.listContainer}>
                <FlashList
                    data={items}
                    renderItem={({ item, index }) => <InviteItem item={item} isLast={index === items.length - 1} />}
                    estimatedItemSize={scale(76)}
                >
                </FlashList>
            </View>
        </View>
    );
};

export default NewFriendScreen;

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