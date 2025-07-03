import { Text, View } from 'react-native';

export default function Header() {
    return (
        <>
            <View className="flex h-12 flex-row items-center justify-center">
                <Text className="text-3xl font-semibold">WTM</Text>
            </View>
        </>
    );
}
