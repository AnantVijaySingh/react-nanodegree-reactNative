import React, {Component} from 'react'
import {View, Text} from 'react-native';
import {getMetricMetaInfo} from "../utils/helpers";

export default class AddEntry extends Component {

    state = {
        run:0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0
    };

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo();

        this.setState((preState) => {
            const count  = preState[metric] + step;

            return {
                ...preState,
                [metric]: count > max ? max : count
            }
        })
    };

    decrement = (metric) => {
        this.setState((preState) => {
            const count  = preState[metric] - getMetricMetaInfo(metric).step;

            return {
                ...preState,
                [metric]: count < 0 ? 0 : count
            }
        })
    };

    render() {
        return (
            <View>
                {getMetricMetaInfo('bike').getIcon()}
            </View>
        )
    }
}