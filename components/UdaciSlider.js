import React from 'react';
import {View, Text, Slider} from 'react-native';

export default function UdaciSlider({max, unit, value, step, onChange}) {
    return (
        <View>
            <Slider
                maximumValue={max}
                minimumValue={0}
                step={step}
                onValueChange={onChange}
                value={value}
            />
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}