import React from 'react';
import { View } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import AddEntry from './components/AddEntry';

export default class App extends React.Component {

  componentDidMount () {
      console.log('before');
      // debugger;
      console.log('after');
  }


  render() {
    return (
        <View>
            <AddEntry/>
        </View>
    );
  }
}
