import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../Constants/Colors'
const Input = ({ todo, onChangeHandler, onAddHandler, onEditHandler }) =>
{
    return (
        <View style={styles.inpBox}>
            <TextInput placeholder='Write Down your Goals . . .' placeholderTextColor={Colors.textPrimary} style={styles.inpTxt} value={todo} onChangeText={onChangeHandler} />
            <View style={{ overflow: "hidden", borderRadius: 5 }}>
                <Pressable

                    android_ripple={{
                        color: Colors.tertiary,
                        borderless: false
                    }}
                    style={({ pressed }) =>
                    {
                        return [{ backgroundColor: pressed ? Colors.secondary : Colors.primary }, styles.addBtn]
                    }}

                    onPress={onAddHandler}
                    onLongPress={onEditHandler}
                >
                    <Text style={styles.addBtnTxt}>Add</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    inpBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inpTxt: {
        flex: .85,
        borderWidth: 2,
        borderColor: Colors.primary,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        fontSize: Dimensions.width > 400 ? 25 : 15,
        fontWeight: '400',
    },
    addBtn: {
        padding: 15,
        paddingHorizontal: 20,
    },
    addBtnTxt: {
        color: Colors.background,
        fontSize: 16,
        letterSpacing: 1
    },

})
export default Input