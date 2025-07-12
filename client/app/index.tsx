import Auth from 'components/Auth';
import '../global.css';
import { SafeAreaView } from 'react-native';

import { Text, View } from "react-native"

export default function App() {
    return (
        <>
            <SafeAreaView className='bg-purple-400'>
                <Auth />
            </SafeAreaView>
        </>
    );
}
