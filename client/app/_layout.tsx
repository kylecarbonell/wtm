import FontAwesome from '@expo/vector-icons/FontAwesome.js';
import { Tabs } from 'expo-router/build/index.js';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Keychain from 'react-native-keychain';
import * as SecureStore from 'expo-secure-store';
import Auth from 'app/auth';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


export default function TabLayout() {
    const [token, setToken] = useState<string>()

    useEffect(() => {
        async function getToken() {
            await SecureStore.setItemAsync('token', "22313");
            const token = await SecureStore.getItemAsync('token');
            console.log(token)
        }

        getToken()
    }, [])
    return (
        <Tabs
            screenOptions={({ route }) => {
                const focusedRouteName = getFocusedRouteNameFromRoute(route) || route.name;

                const routeName = focusedRouteName.toLowerCase();

                // List of routes that should hide the tab bar
                const hideTabRoutes = ['auth', 'login', 'register'];

                return {
                    headerShown: false,
                    tabBarStyle: hideTabRoutes.includes(routeName)
                        ? { display: 'none' }
                        : { display: 'flex' },
                };
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <FontAwesome size={28} name="home" color={color} />
                    ),
                    href: null
                }}
            />
            <Tabs.Screen
                name="auth"
                options={{
                    title: 'Auth',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <FontAwesome size={28} name="user" color={color} />
                    ),
                    href: null
                }}
            />
            <Tabs.Screen
                name="Auth"
                options={{
                    title: 'Auth',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <FontAwesome size={28} name="user" color={color} />
                    ),
                    href: null
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <FontAwesome size={28} name="user" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
