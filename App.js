import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, ToastAndroid, View } from 'react-native';
// import Colors from './Constants/Colors';
// import SendSMS from './Components/SendSMS';
import TodoListScreen from './Screens/TodoListScreen';

export default function App()
{


  // const [txtTel1, setTxtTel1] = useState();
  // const [txtTel2, setTxtTel2] = useState();
  // const [txtTextValue, setTxtTextValue] = useState("");

  return (
    <SafeAreaView style={styles.appContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TodoListScreen />
        {/*An example for SMS sending form
         <SendSMS
          txtTel1={txtTel1 ?? ""}
          txtTel2={txtTel2 ?? ""}
          txtTextValue={txtTextValue}
          setTxtTel1={setTxtTel1}
          setTxtTel2={setTxtTel2}
          setTxtTextValue={setTxtTextValue}

        /> */}
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20
  },
});

