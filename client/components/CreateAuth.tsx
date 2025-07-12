import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { login, signUp } from "services/auth";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from 'toastify-react-native'
import { useRouter } from "expo-router"



export default function CreateAuth() {
    const router = useRouter();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')



    async function handleSignUp() {
        if (!email || !password || !repeatPassword || !name || !username) {
            console.log("HLJSDfl")
            return null
        }

        if (password != repeatPassword) {
            Toast.error("Passwords do not match!");
            return
        }


        const val = await signUp(name, username, email, password)

        if (val.status != 200) {
            Toast.error(val.message)
        } else {
            Toast.success(val.message)
            console.log(val.token)
            await AsyncStorage.setItem('token', val.token!);
            router.push("/home")
        }


        console.log("THIS IS VAL", val)
    }

    return <>
        <SafeAreaView className="h-full w-full bg-purple-400 flex items-center">
            <ToastManager />
            <Text className="flex flex-row text-4xl text-white">
                WTM
            </Text>

            <Text className="text-white text-base mb-16">
                Your favorite social network
            </Text>

            <View className="bg-white h-full w-screen rounded-t-3xl flex flex-col p-8">
                <Text className="text-3xl mb-24">Create an account</Text>

                <View className="mb-8">
                    <Text className="mb-2">
                        Full Name <Text className="text-red-600">*</Text>
                    </Text>
                    <View className="border rounded-lg items-center p-2 h-auto w-full flex flex-row bg-white">
                        <TextInput autoCorrect={false} autoCapitalize="none" className=" bg-white w-5/6 h-full px-4 items-center" onChangeText={setName} />
                    </View>
                </View>

                <View className="mb-8">
                    <View className="flex justify-between flex-row">
                        <Text className="mb-2">Username <Text className="text-red-600">*</Text></Text>
                    </View>

                    <View className="border rounded-lg items-center p-2 h-auto w-full flex flex-row bg-white">
                        <TextInput autoCorrect={false} autoCapitalize="none" className=" bg-white w-5/6 h-full px-4 items-center" onChangeText={setUsername} />
                    </View>
                </View>

                <View className="mb-8">
                    <View className="flex justify-between flex-row">
                        <Text className="mb-2">Email <Text className="text-red-600">*</Text></Text>
                    </View>

                    <View className="border rounded-lg items-center p-2 h-auto w-full flex flex-row bg-white">
                        <TextInput autoCorrect={false} autoCapitalize="none" className=" bg-white w-5/6 h-full px-4 items-center" onChangeText={setEmail} />
                    </View>
                </View>

                <View className="mb-8">
                    <View className="flex justify-between flex-row">
                        <Text className="mb-2">Password <Text className="text-red-600">*</Text></Text>
                    </View>

                    <View className="border rounded-lg items-center p-2 h-auto w-full flex flex-row bg-white">
                        <TextInput autoCorrect={false} autoCapitalize="none" className=" bg-white w-5/6 h-full px-4 items-center" onChangeText={setPassword} />
                    </View>
                </View>

                <View className="mb-8">
                    <View className="flex justify-between flex-row">
                        <Text className="mb-2">Repeat Password <Text className="text-red-600">*</Text></Text>
                    </View>

                    <View className="border rounded-lg items-center p-2 h-auto w-full flex flex-row bg-white">
                        <TextInput autoCorrect={false} autoCapitalize="none" className=" bg-white w-5/6 h-full px-4 items-center" onChangeText={setRepeatPassword} />
                    </View>
                </View>



                <Pressable className="bg-purple-500 rounded-lg w-full h-10 flex items-center justify-center" onPress={() => {
                    console.log("LSDJFLKS")
                    handleSignUp()
                }}
                >
                    <Text className="text-white font-semibold text-lg">Sign up</Text>
                </Pressable>
                <View className="flex items-center justify-end h-24" >
                    <Pressable className="flex flex-row" onPress={() => {
                        router.push("/")
                    }}>
                        <Text>Already have an account? </Text>
                        <Text className="text-blue-500">Log In</Text>
                    </Pressable>
                </View>
            </View>

        </SafeAreaView>
    </>
}