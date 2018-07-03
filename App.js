import React from 'react';
import {View, Platform, StatusBar } from 'react-native';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import AddEntry from './components/AddEntry';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import History from './components/History';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import {purple, white} from "./utils/colors";
import {Constants} from 'expo';

const store = createStore(reducer, middleware);

function UdaciStatusBar ({backgroundColor,  ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

const TabsiOS = createBottomTabNavigator({
    History:{
        screen: History,
        navigationOptions: {
            tabBarLable: 'History',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30}  color={tintColor}/>
        }
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLable: 'Add Entry',
            tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        }
    },
},
    {   navigationOptions: {
            header: null,
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    });

const TabsAndroid = createMaterialTopTabNavigator({
        History:{
            screen: History,
            navigationOptions: {
                tabBarLable: 'History',
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30}  color={tintColor}/>
            }
        },
        AddEntry: {
            screen: AddEntry,
            navigationOptions: {
                tabBarLable: 'Add Entry',
                tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
            }
        },
    },
    {   navigationOptions: {
            header: null,
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    });

export default class App extends React.Component {

    componentDidMount () {
        console.log('before');
        // debugger;
        console.log('after');
    }
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
                    {
                        Platform.OS === 'ios'
                        ? <TabsiOS />
                            : <TabsAndroid/>
                    }
                </View>
            </Provider>
        );
    }
}
