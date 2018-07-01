import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {purple} from "../utils/colors";

export default function TextButton({children, onPress, style={}}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{padding: 10}}>
            <Text style={[styles.reset, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        color: purple,
        fontSize: 20,
        textAlign: 'center'
    }
});