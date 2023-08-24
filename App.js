import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Topbar from './components/Topbar';
import { SafeAreaView } from 'react-native-safe-area-context'
import Main from './components/Main';
import Bottom from './components/Bottom';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Topbar/> */}
      <Main/>
      <Bottom/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
