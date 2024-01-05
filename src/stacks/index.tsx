import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStorage } from '../lib/storage'
import { navigationRef } from '../lib/root-navigation';
import {
    EntryScreen,
    WebScreen,
    LoginScreen,
    UnlockScreen,
    RegisterScreen,
} from '../screens/index'
import AuthStackNav from './auth-stack';
const MainStack = () => {
    const Stack = createStackNavigator<RootStackParamList>();
    return <Stack.Navigator screenOptions={{
        headerShown: false,
    }}
        initialRouteName={globalThis.wallet ? 'AuthStackNav' : 'Entry'}
        //initialRouteName={'Register'}
    >
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="Web" component={WebScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Unlock" component={UnlockScreen} />
        <Stack.Screen name='AuthStackNav' component={AuthStackNav} />
    </Stack.Navigator>
}

export default () => {
    const [initialState, setInitialState] = useState();
    useEffect(() => {
        const stackState = globalStorage.getString('navigation-state');
        if (stackState) {
            setInitialState(JSON.parse(stackState));
        }
    }, []);
    return <NavigationContainer
        ref={navigationRef}
        initialState={initialState}
        onStateChange={(state) => {
            globalStorage.setItem('navigation-state', JSON.stringify(state));
        }}
    >
        <MainStack />
    </NavigationContainer>
}