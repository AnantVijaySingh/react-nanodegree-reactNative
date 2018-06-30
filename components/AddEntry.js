import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Slider, StyleSheet} from 'react-native';
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from "../utils/helpers";
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import TextButton from './TextButton';
import {Ionicons} from '@expo/vector-icons';
import {submitEntry, removeEntry} from "../utils/api";
import {connect} from 'react-redux';
import {addEntry} from "../actions";


function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Text>
                Submit
            </Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component {

    state = {
        run:0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0,
        value:0
    };


    reset = () => {
        const key = timeToString();

        this.props.dispatch(addEntry({
            [key]:getDailyReminderValue(),
        }));
        // Remove entry from DB
        removeEntry(key);
    };


    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);

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


    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value,
        }))
    };


    submit = () => {
        const key = timeToString();
        const entry = this.state;

        this.props.dispatch(addEntry({
            [key]: entry,
        }));

        this.setState(() => ({
            run:0,
            bike:0,
            swim:0,
            sleep:0,
            eat:0
        }));

        // Adding entry to DB
        submitEntry({key, entry});

    };


    render() {
        const metaInfo = getMetricMetaInfo();

        if(this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons
                        name='ios-happy-outline'
                        size={100}
                    />
                    <Text>You have already logged your information from today</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const{getIcon, type, ...rest} = metaInfo[key];
                    const value = this.state[key];

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                            ? <UdaciSlider
                                value={value}
                                onChange={(value) => this.slide(key,value)}
                                {...rest}
                                />
                            : <UdaciStepper
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />
                            }
                        </View>
                    )

                })}
                <SubmitBtn onPress={this.submit}/>
                <Slider
                    minimumValue={-10}
                    maximumValue={10}
                    step={1}
                    value={this.state.value}
                    onValueChange={(value) => this.setState((prvState)=>({
                        ...prvState,
                        value: value
                    }))}
                />
                <Text>
                    Value: {this.state.value}
                </Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    const key = timeToString();

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry);