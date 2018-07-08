import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Slider, StyleSheet, Platform} from 'react-native';
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from "../utils/helpers";
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import TextButton from './TextButton';
import {Ionicons} from '@expo/vector-icons';
import {submitEntry, removeEntry} from "../utils/api";
import {connect} from 'react-redux';
import {addEntry} from "../actions";
import {white, purple} from '../utils/colors';
import {NavigationActions} from 'react-navigation'


function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
        >
            <Text style={styles.submitBtnText}>
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

        this.toHome();

        // Remove entry from DB
        removeEntry(key);
    };

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddEntry'
        }))
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

        this.toHome();

        // Adding entry to DB
        submitEntry({key, entry});

    };


    render() {
        const metaInfo = getMetricMetaInfo();

        if(this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
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
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key];
                    const value = this.state[key];

                    return (
                        <View key={key} style={styles.row}>
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
                                />}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
        height: 45,
        paddingLeft: 30,
        paddingRight: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText:{
        textAlign: 'center',
        fontSize: 22,
        color: white,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
    }
});


function mapStateToProps(state) {
    const key = timeToString();

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry);