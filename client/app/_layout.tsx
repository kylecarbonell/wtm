import FontAwesome from '@expo/vector-icons/FontAwesome.js';
import { Tabs } from 'expo-router/build/index.js';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <FontAwesome size={28} name="home" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
