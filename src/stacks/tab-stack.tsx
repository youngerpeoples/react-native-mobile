import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    HomeScreen,
    ContactScreen,
    UserCenterScreen
} from '../screens/index'
import BottomTabBar from '../components/bottom-tab-bar';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default () => {
    const Stack = createBottomTabNavigator<RootStackParamList>();
    const insets = useSafeAreaInsets();
    return <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Contact" tabBar={(props) => {
        return <View style={{
            paddingBottom: insets.bottom,
            backgroundColor: 'white',
        }}>
            <BottomTabBar {...props} />
        </View>
    }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="UserCenter" component={UserCenterScreen} />
    </Stack.Navigator>
}