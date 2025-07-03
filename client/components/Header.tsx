import { Text, View } from 'react-native';

export default function Header() {
    return (
        <>
            <View className='flex h-12 items-center justify-center flex-row'>
                <Text className='text-3xl font-semibold'>WTM</Text>
            </View>
        </>
    );
}
