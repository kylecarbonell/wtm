import { SafeAreaView } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className="bg-red-600">{children}</SafeAreaView>;
};

const styles = {
  container: 'flex flex-1 m-6',
};
