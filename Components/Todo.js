import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../Constants/Colors'

export const Todo = ({ item, onPress, onLongPress }) =>
{

    return (
        <View style={{ overflow: "hidden", borderRadius: 5 }}>
            <Pressable android_ripple={{ color: Colors.secondary }} style={({ pressed }) =>
            {
                return [{ backgroundColor: pressed ? styles.iosRipple : Colors.tertiary }, styles.listItem]
            }} onPress={onPress}
                onLongPress={onLongPress}
            >
                <Text style={styles.listItemTxt}>{item.todo}</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({

    listItem: {
        padding: 10,
        backgroundColor: Colors.tertiary,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 5,
    },
    iosRipple: {
        backgroundColor: Colors.tertiary
        , shadowOffset: {

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