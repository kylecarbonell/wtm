import { StatusBar } from 'expo-status-bar';

import '../global.css';
import Header from 'components/Header';
import { SafeAreaView } from 'react-native';

export default function App() {
    return (
        <>
            <SafeAreaView>
                <Header></Header>
                <StatusBar style="auto" />
            </SafeAreaView>
        </>
    );
}
