import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import {Context} from '../Context';
import TopTabNavigation from './TopTabNavigation';
import SignIn from '../screens/SignIn';

const BottomTabNavigation = () => {

    const {login} = useContext(Context)

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => <Icon name="home" size={24} color={focused ? 'red' : '#F9AD59'}/>
                }}
            />
            <Tab.Screen
                name="Chat"
                component={login ? TopTabNavigation : SignIn}
                options={{
                    tabBarIcon: ({focused}) => <Icon name="rocketchat" size={24} color={focused ? 'red' : '#F9AD59'}/>
                }}
            />
            <Tab.Screen
                name="Profile"
                component={login ? Profile: SignIn}
                options={{
                    tabBarIcon: ({focused}) => <Icon name="user-alt" size={24} color={focused ? 'red' : '#F9AD59'}/>
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
