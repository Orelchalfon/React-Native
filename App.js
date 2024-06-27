import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import uuid from "react-native-uuid";
import Input from './Components/Input';
import Colors from './Constants/Colors';

export default function App()
{
  const [todo, setTodo] = useState(''); // [1]
  const [todos, setTodos] = useState([]); // [2]
  const [isEditing, setIsEditing] = useState(false); // [3]
  const [currentEditId, setCurrentEditId] = useState(null); // Track the item being edited

  const onChangeHandler = (text) =>
  {
    setTodo(text);
  };

  const onAddHandler = () =>
  {
    if (todo.trim() === '') {
      ToastAndroid.showWithGravity(
        "A wild toast appeared!",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    }
    setTodos(currentTodoStats => [...currentTodoStats, { todo, id: uuid.v4() }]);
    setTodo('');
  };

  const onDeleteHandler = (item) =>
  {
    setTodos(prevTodoList => prevTodoList.filter((todoItem) => todoItem.id !== item.id));
  };

  const onEditHandler = (item) =>
  {
    setIsEditing(true);
    setCurrentEditId(item.id);
    setTodo(item.todo);
  };

  const onSaveEditHandler = () =>
  {
    setTodos(prevTodos =>
      prevTodos.map(item =>
        item.id === currentEditId ? { ...item, todo } : item
      )
    );
    setIsEditing(false);
    setCurrentEditId(null);
    setTodo('');
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Input todo={todo} onChangeHandler={onChangeHandler} onAddHandler={isEditing ? onSaveEditHandler : onAddHandler} />
        <View style={styles.list}>
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ overflow: "hidden", borderRadius: 5 }}>
                <Pressable
                  onPress={() => onDeleteHandler(item)}
                  onLongPress={() => onEditHandler(item)}
                  android_ripple={{ color: Colors.secondary }}
                  style={({ pressed }) => [
                    { backgroundColor: pressed ? styles.iosRipple : Colors.tertiary },
                    styles.listItem
                  ]}
                >
                  <Text style={styles.listItemTxt}>{item.todo}</Text>
                </Pressable>
              </View>
            )}
          />
        </View>
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
  list: {
    flex: 5,
    padding: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: Colors.tertiary,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 5,
  },
  iosRipple: {
    backgroundColor: Colors.tertiary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  listItemTxt: {
    color: Colors.background,
    fontSize: 20,
  },
});
