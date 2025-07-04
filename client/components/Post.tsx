import { Text, View, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const POST = require('../assets/images/post.jpeg');
export default function Post() {
    return (
        <>
            <View className="mb-4 mt-4 flex h-auto w-11/12 flex-col items-center self-center rounded-2xl bg-white shadow">
                {/* Post Header */}
                <View className="my-3 flex h-12 w-full flex-row items-center justify-between bg-white px-2">
                    <View className="flex flex-row items-center gap-x-3">
                        <Image
                            source={require('../assets/images/post2.jpeg')}
                            className="h-12 w-12 rounded-full bg-orange-600" />
                        <Text className="font-semibold">party_arty_dk</Text>
                    </View>
                    <AntDesign name="ellipsis1" size={20} color="black" />
                </View>

                {/* Post Image */}
                <Image
                    source={require('../assets/images/post.jpeg')}
                    className="aspect-square h-96 min-w-full bg-blue-600"
                />

                <View className="flex h-12 w-full flex-row items-end justify-between bg-white px-3">
                    <View className="flex flex-row items-center gap-x-4">
                        {/* If user liked the post */}
                        {/* <AntDesign name="heart" size={24} color="red" />  */}

                        {/* If not like */}
                        <AntDesign name="hearto" size={24} color="black" />
                        {/* <Image src={require("../assets/icon.png")} className="h-8 w-8 bg-orange-600"></Image> */}
                        <AntDesign name="message1" size={24} color="black" />
                    </View>
                </View>

                <View className="flex w-full min-w-full justify-center rounded-b-2xl bg-white px-3 pt-2">
                    <Text>
                        {/* Caption */}
                        <Text>Like by ...</Text>

                    </Text>
                </View>

                {/* Post Caption */}
                <View className="flex h-auto min-h-16 w-full min-w-full justify-center rounded-b-2xl bg-white px-3">
                    <Text>
                        {/* User name */}
                        <Text className="font-bold">party_arty_dk </Text>
                        {/* Caption */}
                        <Text>This is me snowboarding </Text>

                    </Text>
                </View>
            </View>
        </>
    );
}
