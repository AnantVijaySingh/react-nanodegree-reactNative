import React from 'react';
import {Text, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import AddEntry from './components/AddEntry';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

const store = createStore(reducer, middleware);

export default class App extends React.Component {

    componentDidMount () {
        console.log('before');
        // debugger;
        console.log('after');
    }
    render() {
        return (
            <Provider store={store}>
                <View>
                    <AddEntry/>
                </View>
            </Provider>
        );
    }
}
