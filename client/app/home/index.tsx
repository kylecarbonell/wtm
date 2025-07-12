import { StatusBar } from 'expo-status-bar';

import '../../global.css';
import Header from 'components/Header';
import { SafeAreaView, ScrollView } from 'react-native';
import Post from 'components/Post';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    useEffect(() => {
        async function get() {
            const name = await AsyncStorage.getItem('token');
            console.log('THIS IS MY TOKEN AFTER LOAD', name); // → "kcarbonell"
        }
        get();
    }, []);
    return (
        <>
            <SafeAreaView>
                <Header></Header>
                <ScrollView className="h-screenpb-32 mt-4">
                    {Array(5)
                        .fill(0)
                        .map((val, i) => (
                            <Post key={i}></Post>
                        ))}
                </ScrollView>
                <StatusBar style="auto" />
            </SafeAreaView>
        </>
    );
}
