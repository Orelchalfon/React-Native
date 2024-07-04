import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import uuid from "react-native-uuid";
import Input from '../Components/Input';
import { Todo } from '../Components/Todo';
import Colors from '../Constants/Colors';
const TodoListScreen = () =>
{
    const [todo, setTodo] = useState(''); // [1]
    const [todos, setTodos] = useState([]); // [2]
    const [isEditing, setIsEditing] = useState(false); // [3]
    const [currentEditId, setCurrentEditId] = useState(null); // [4] Track the item being edited


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
        <>
            <Input todo={todo} onChangeHandler={onChangeHandler} onAddHandler={isEditing ? onSaveEditHandler : onAddHandler} />
            <View style={styles.list}>
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Todo
                            item={item}
                            onPress={() => onDeleteHandler(item)}
                            onLongPress={() => onEditHandler(item)}
                        />

                    )}
                />
            </View>

        </>
    )
}
const styles = StyleSheet.create({
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

})
export default TodoListScreen