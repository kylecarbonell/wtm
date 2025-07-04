import { StatusBar } from 'expo-status-bar';

import '../global.css';
import Header from 'components/Header';
import { SafeAreaView, ScrollView } from 'react-native';
import Post from 'components/Post';

export default function App() {
    return (
        <>
            <SafeAreaView>
                <Header></Header>
                <ScrollView className="mt-4 h-screenpb-32">
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
