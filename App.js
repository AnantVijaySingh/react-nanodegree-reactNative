import React from 'react';
import {View, Platform, StatusBar } from 'react-native';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import AddEntry from './components/AddEntry';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import History from './components/History';
import {createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createDrawerNavigator} from 'react-navigation';
import {purple, white} from "./utils/colors";
import {Constants} from 'expo';
import EntryDetail from './components/EntryDetail';
import Live from './components/Live';
import {setLocalNotifications} from "./utils/helpers";

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
    Live : {
        screen: Live,
        navigationOptions: {
            tabBarLable: 'Live',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
        }
    }
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
        Live : {
            screen: Live,
            navigationOptions: {
                tabBarLable: 'Live',
                tabBarIcon: ({tintColor}) => <FontAwesome name='compass' size={30} color={tintColor} />
            }
        }
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

const MainNavigator = createStackNavigator({
    Home: {
        screen: Platform.OS === 'ios' ? TabsiOS : TabsAndroid,
        navigationOptions: {
            header: null, // need to set this for createTabNavigator function
        }
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            }
        }
    }
});

export default class App extends React.Component {

    componentDidMount () {
        console.log('before');
        // debugger;
        console.log('after');

        setLocalNotifications();
    }
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}
