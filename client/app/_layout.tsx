import FontAwesome from '../$node_modules/@expo/vector-icons/FontAwesome.js';
import { Tabs } from '../$node_modules/expo-router/build/index.js';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />

        </Tabs>
    );
}