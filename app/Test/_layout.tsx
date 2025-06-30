import { Stack } from "expo-router"
// import { Stack } from "react-native"

export default function Layout() {
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="Home"
            options={{ title: 'Welcome', headerShown: false }}
        />
    </Stack>
}