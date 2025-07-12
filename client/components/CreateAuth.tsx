import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { signUp } from 'services/auth';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from 'toastify-react-native';
import { useRouter } from 'expo-router';

export default function CreateAuth() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    async function handleSignUp() {
        if (!email || !password || !repeatPassword || !name || !username) {
            console.log('HLJSDfl');
            return null;
        }

        if (password !== repeatPassword) {
            Toast.error('Passwords do not match!');
            return;
        }

        const val = await signUp(name, username, email, password);

        if (val.status !== 200) {
            Toast.error(val.message);
        } else {
            Toast.success(val.message);
            console.log(val.token);
            await AsyncStorage.setItem('token', val.token!);
            router.push('/home');
        }

        console.log('THIS IS VAL', val);
    }

    return (
        <>
            <SafeAreaView className="flex h-full w-full items-center bg-purple-400">
                <ToastManager />
                <Text className="flex flex-row text-4xl text-white">WTM</Text>

                <Text className="mb-16 text-base text-white">Your favorite social network</Text>

                <View className="flex h-full w-screen flex-col rounded-t-3xl bg-white p-8">
                    <Text className="mb-24 text-3xl">Create an account</Text>

                    <View className="mb-8">
                        <Text className="mb-2">
                            Full Name <Text className="text-red-600">*</Text>
                        </Text>
                        <View className="flex h-auto w-full flex-row items-center rounded-lg border bg-white p-2">
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize="none"
                                className=" h-full w-5/6 items-center bg-white px-4"
                                onChangeText={setName}
                            />
                        </View>
                    </View>

                    <View className="mb-8">
                        <View className="flex flex-row justify-between">
                            <Text className="mb-2">
                                Username <Text className="text-red-600">*</Text>
                            </Text>
                        </View>

                        <View className="flex h-auto w-full flex-row items-center rounded-lg border bg-white p-2">
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize="none"
                                className=" h-full w-5/6 items-center bg-white px-4"
                                onChangeText={setUsername}
                            />
                        </View>
                    </View>

                    <View className="mb-8">
                        <View className="flex flex-row justify-between">
                            <Text className="mb-2">
                                Email <Text className="text-red-600">*</Text>
                            </Text>
                        </View>

                        <View className="flex h-auto w-full flex-row items-center rounded-lg border bg-white p-2">
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize="none"
                                className=" h-full w-5/6 items-center bg-white px-4"
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>

                    <View className="mb-8">
                        <View className="flex flex-row justify-between">
                            <Text className="mb-2">
                                Password <Text className="text-red-600">*</Text>
                            </Text>
                        </View>

                        <View className="flex h-auto w-full flex-row items-center rounded-lg border bg-white p-2">
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize="none"
                                className=" h-full w-5/6 items-center bg-white px-4"
                                onChangeText={setPassword}
                            />
                        </View>
                    </View>

                    <View className="mb-8">
                        <View className="flex flex-row justify-between">
                            <Text className="mb-2">
                                Repeat Password <Text className="text-red-600">*</Text>
                            </Text>
                        </View>

                        <View className="flex h-auto w-full flex-row items-center rounded-lg border bg-white p-2">
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize="none"
                                className=" h-full w-5/6 items-center bg-white px-4"
                                onChangeText={setRepeatPassword}
                            />
                        </View>
                    </View>

                    <Pressable
                        className="flex h-10 w-full items-center justify-center rounded-lg bg-purple-500"
                        onPress={() => {
                            console.log('LSDJFLKS');
                            handleSignUp();
                        }}>
                        <Text className="text-lg font-semibold text-white">Sign up</Text>
                    </Pressable>
                    <View className="flex h-24 items-center justify-end">
                        <Pressable
                            className="flex flex-row"
                            onPress={() => {
                                router.push('/');
                            }}>
                            <Text>Already have an account? </Text>
                            <Text className="text-blue-500">Log In</Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
