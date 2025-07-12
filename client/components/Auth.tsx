import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { login } from 'services/auth';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <SafeAreaView className="flex h-full w-full items-center bg-purple-400">
                <Text className="flex flex-row text-4xl text-white">WTM</Text>

                <Text className="mb-16 text-base text-white">Your favorite social network</Text>

                <View className="flex h-full w-screen flex-col rounded-t-3xl bg-white p-8">
                    <Text className="mb-24 text-3xl">Log in</Text>

                    <View className="mb-8">
                        <Text className="mb-2">Username</Text>
                        <View className="flex h-auto w-full flex-row items-center rounded-lg border bg-white p-2">
                            <MaterialIcons name="person" size={24} color="black" />
                            <TextInput
                                autoCapitalize="none"
                                className=" h-full w-5/6 items-center bg-white px-4"
                                onChangeText={setIdentifier}
                            />
                        </View>
                    </View>

                    <View className="mb-8">
                        <View className="flex flex-row justify-between">
                            <Text className="mb-2">Username</Text>
                            <Pressable>
                                <Text className="mb-2 text-blue-500">Forgot your password?</Text>
                            </Pressable>
                        </View>

                        <View className="flex h-auto w-full flex-row items-center rounded-lg border bg-white p-2">
                            <MaterialIcons name="key" size={24} color="black" />
                            <TextInput
                                autoCapitalize="none"
                                className=" h-full w-5/6 items-center bg-white px-4"
                                onChangeText={setPassword}
                            />
                        </View>
                    </View>

                    <Pressable
                        className="flex h-10 w-full items-center justify-center rounded-lg bg-purple-500"
                        onPress={async () => {
                            const val = await login(identifier, password);
                            if (val == null) {
                                return;
                            } else {
                                console.log(val.token);
                                await AsyncStorage.setItem('token', val.token!);
                                router.push('/home');
                            }
                        }}>
                        <Text className="text-lg font-semibold text-white">Log in</Text>
                    </Pressable>

                    <View className="flex h-96 flex-row items-end justify-center">
                        <Pressable
                            className="flex flex-row"
                            onPress={() => {
                                router.push('/auth');
                            }}>
                            <Text>Dont have an account? </Text>
                            <Text className="text-blue-500">Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
