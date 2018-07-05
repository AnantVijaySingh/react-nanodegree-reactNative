import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {white} from "../utils/colors";
import MetricCard from './MetricCard';
import {addEntry} from "../actions";
import {removeEntry} from "../utils/api";
import {timeToString, getDailyReminderValue} from "../utils/helpers";
import TextButton from './TextButton';

class EntryDetail extends React.Component {

    // this.props.navigation.state.params.'parameterName' to access values passed via navigate function
    // Remember that all props are passed by default to the child when using connect

    // Helps to dynamically set navigationOption properties such as header value/string
    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params;

        const year = entryId.slice(0,4);
        const month = entryId.slice(5,7);
        const day = entryId.slice(8);

        return {
            title: `${day}/${month}/${year}`
        }
    };

    reset = () => {
        const{entryId, remove, goBack} = this.props;

        remove();
        goBack();
        removeEntry(entryId)
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    render() {
        const {metrics} = this.props;

        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
                <TextButton onPress={this.reset} style={{margin: 20}}>
                    RESET
                </TextButton>
                {/*<Text>Entry Details = {JSON.stringify(this.props.navigation.state.params.entryId)}</Text>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
});

function mapStateToProps(state, {navigation}) {
    const {entryId} = navigation.state.params;

    return {
        entryId,
        metrics: state[entryId]
    }
}

function mapDispatchToProps(dispatch, {navigation}) {
    const {entryId} = navigation.state.params;

    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
        })),
        goBack: () => navigation.goBack()
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);