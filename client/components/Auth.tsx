import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { login } from "services/auth";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Auth() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    return <>
        <SafeAreaView className="h-full w-full bg-purple-400 flex items-center">
            <Text className="flex flex-row text-4xl text-white">
                WTM
            </Text>

            <Text className="text-white text-base mb-16">
                Your favorite social network
            </Text>

            <View className="bg-white h-full w-screen rounded-t-3xl flex flex-col p-8">
                <Text className="text-3xl mb-24">Log in</Text>

                <View className="mb-8">
                    <Text className="mb-2">Username</Text>
                    <View className="border rounded-lg items-center p-2 h-auto w-full flex flex-row bg-white">
                        <MaterialIcons name="person" size={24} color="black" />
                        <TextInput autoCapitalize="none" className=" bg-white w-5/6 h-full px-4 items-center" onChangeText={setIdentifier} />
                    </View>

                </View>

                <View className="mb-8">
                    <View className="flex justify-between flex-row">
                        <Text className="mb-2">Username</Text>
                        <Pressable><Text className="mb-2 text-blue-500">Forgot your password?</Text ></Pressable>
                    </View>

                    <View className="border rounded-lg items-center p-2 h-auto w-full flex flex-row bg-white">
                        <MaterialIcons name="key" size={24} color="black" />
                        <TextInput autoCapitalize="none" className=" bg-white w-5/6 h-full px-4 items-center" onChangeText={setPassword} />
                    </View>

                </View>

                <Pressable className="bg-purple-500 rounded-lg w-full h-10 flex items-center justify-center"
                    onPress={async () => {
                        const val = await login(identifier, password)
                        if (val == null) {
                            return
                        } else {
                            console.log(val.token)
                            await AsyncStorage.setItem('token', val.token!);
                            router.push("/home")
                        }

                    }}>
                    <Text className="text-white font-semibold text-lg">Log in</Text>
                </Pressable>

                <View className="flex items-end h-96 justify-center flex-row">
                    <Pressable className="flex flex-row" onPress={() => { router.push("/auth") }}>
                        <Text>Don't have an account? </Text>
                        <Text className="text-blue-500">Sign Up</Text>
                    </Pressable>
                </View>
            </View>

        </SafeAreaView>
    </>
}