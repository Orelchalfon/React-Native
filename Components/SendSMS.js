import React from 'react'
import { Button, View, StyleSheet, Alert, TextInput } from 'react-native';
import * as SMS from 'expo-sms';

export default function SendSMS({ txtTel1, txtTel2, txtTextValue, setTxtTel1, setTxtTel2, setTxtTextValue })
{


    const smsForm = async () =>
    {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            const { result } = await SMS.sendSMSAsync(
                [txtTel1, txtTel2],
                txtTextValue
            );
            setTxtTextValue(result);
        } else {
            Alert.alert('Error', 'There is no SMS available on this device');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Phone Number 1"
                value={txtTel1}
                onChangeText={setTxtTel1}
                keyboardType='phone-pad'
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number 2"
                value={txtTel2}
                onChangeText={setTxtTel2}
                keyboardType='phone-pad'
            />
            <TextInput
                style={styles.input}
                placeholder="Message"
                value={txtTextValue}
                onChangeText={setTxtTextValue}
            />
            <Button title="Send SMS" onPress={smsForm} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: '100%',
        padding: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
});
