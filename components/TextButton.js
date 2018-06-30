import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function TextButton({children, onPress}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{padding: 10}}
        >
            <Text>{children}</Text>
        </TouchableOpacity>
    )
}